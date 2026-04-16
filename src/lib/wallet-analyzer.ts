import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || "";
const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const HELIUS_API = `https://api.helius.xyz/v0`;

// Max pages to fetch (each page = 100 txns, 10 pages = 1000 txns)
const MAX_PAGES = 10;

/* ───── Types ───── */

export interface TokenBalance {
  mint: string;
  symbol: string;
  amount: number;
  usdValue: number;
}

export interface WalletSnapshot {
  solBalance: number;
  solUsdValue: number;
  tokenBalances: TokenBalance[];
  totalUsdValue: number;
}

export interface TransactionSummary {
  totalInflow: number;
  totalOutflow: number;
  peakEstimatedValue: number;
  currentEstimatedValue: number;
  painScore: number;
  roundtripAmount: number;
  transactionCount: number;
  oldestTxDate: string | null;
  newestTxDate: string | null;
}

export interface WalletAnalysis {
  address: string;
  snapshot: WalletSnapshot;
  summary: TransactionSummary;
  qualified: boolean;
  timestamp: number;
}

/* ───── Helius parsed transaction types ───── */

interface HeliusParsedTx {
  signature: string;
  timestamp: number;
  type: string;
  source: string;
  nativeTransfers?: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }>;
  tokenTransfers?: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    mint: string;
    tokenAmount: number;
    tokenStandard: string;
  }>;
  accountData?: Array<{
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges?: Array<{
      mint: string;
      rawTokenAmount: {
        decimals: number;
        tokenAmount: string;
      };
      userAccount: string;
    }>;
  }>;
}

/* ───── Helpers ───── */

async function getSolPrice(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      { next: { revalidate: 120 } }
    );
    const data = await res.json();
    if (data?.solana?.usd) return data.solana.usd;
  } catch {
    // fallback
  }
  return 150;
}

/* ───── Current portfolio via Helius DAS ───── */

async function getCurrentBalances(address: string): Promise<WalletSnapshot> {
  const connection = new Connection(HELIUS_RPC);
  const pubkey = new PublicKey(address);

  const solPrice = await getSolPrice();

  // SOL balance
  const solLamports = await connection.getBalance(pubkey);
  const solBalance = solLamports / LAMPORTS_PER_SOL;
  const solUsdValue = solBalance * solPrice;

  // Token balances via Helius DAS (searchAssets)
  const tokenBalances: TokenBalance[] = [];
  try {
    const res = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "rta-balances",
        method: "searchAssets",
        params: {
          ownerAddress: address,
          tokenType: "fungible",
          displayOptions: { showNativeBalance: false },
        },
      }),
    });
    const data = await res.json();
    if (data?.result?.items) {
      for (const item of data.result.items) {
        const info = item.token_info;
        if (info && info.price_info?.total_price > 0) {
          tokenBalances.push({
            mint: item.id,
            symbol: info.symbol || "???",
            amount: info.balance / Math.pow(10, info.decimals || 0),
            usdValue: info.price_info.total_price,
          });
        }
      }
    }
  } catch {
    // token fetch failed — continue with SOL only
  }

  const totalUsdValue =
    solUsdValue + tokenBalances.reduce((sum, t) => sum + t.usdValue, 0);

  return { solBalance, solUsdValue, tokenBalances, totalUsdValue };
}

/* ───── Paginated transaction history via Helius enhanced API ───── */

async function fetchAllTransactions(
  address: string
): Promise<HeliusParsedTx[]> {
  const allTxns: HeliusParsedTx[] = [];
  let lastSig: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL(`${HELIUS_API}/addresses/${address}/transactions`);
    url.searchParams.set("api-key", HELIUS_API_KEY);
    url.searchParams.set("limit", "100");
    if (lastSig) url.searchParams.set("before", lastSig);

    try {
      const res = await fetch(url.toString());
      if (!res.ok) break;
      const batch: HeliusParsedTx[] = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      allTxns.push(...batch);
      lastSig = batch[batch.length - 1].signature;
      if (batch.length < 100) break; // no more pages
    } catch {
      break;
    }
  }

  return allTxns;
}

/* ───── Core PnL analysis ───── */

interface TokenTracker {
  mint: string;
  solSpent: number;     // total SOL spent buying this token
  solReceived: number;  // total SOL received selling this token
  tokensBought: number;
  tokensSold: number;
}

async function analyzeHistory(
  address: string,
  solPrice: number
): Promise<TransactionSummary> {
  const allTxns = await fetchAllTransactions(address);

  if (allTxns.length === 0) {
    return {
      totalInflow: 0,
      totalOutflow: 0,
      peakEstimatedValue: 0,
      currentEstimatedValue: 0,
      painScore: 0,
      roundtripAmount: 0,
      transactionCount: 0,
      oldestTxDate: null,
      newestTxDate: null,
    };
  }

  // Sort chronologically (oldest first)
  const sorted = [...allTxns].sort(
    (a, b) => (a.timestamp || 0) - (b.timestamp || 0)
  );

  // ── Track per-token cost basis from swaps ──
  const tokenMap = new Map<string, TokenTracker>();

  function getTracker(mint: string): TokenTracker {
    if (!tokenMap.has(mint)) {
      tokenMap.set(mint, {
        mint,
        solSpent: 0,
        solReceived: 0,
        tokensBought: 0,
        tokensSold: 0,
      });
    }
    return tokenMap.get(mint)!;
  }

  // ── Track SOL balance over time for peak detection ──
  let runningSolBalance = 0;
  let peakSolBalance = 0;
  let totalSolDeposited = 0; // SOL received from external (not swaps)
  let totalSolWithdrawn = 0; // SOL sent to external (not swaps)

  // Track cumulative realized gains from token sells (in SOL)
  let cumulativeRealizedSol = 0;
  let peakCumulativeValue = 0; // peak of (solBalance + unrealized token value estimate)

  for (const tx of sorted) {
    const isSwap =
      tx.type === "SWAP" ||
      tx.type === "TOKEN_MINT" ||
      tx.source === "JUPITER" ||
      tx.source === "RAYDIUM" ||
      tx.source === "ORCA" ||
      tx.source === "PUMP_FUN" ||
      tx.source === "MOONSHOT";

    // Compute net SOL change for this wallet in this tx
    let solDelta = 0;
    if (tx.nativeTransfers) {
      for (const nt of tx.nativeTransfers) {
        const amt = nt.amount / LAMPORTS_PER_SOL;
        if (nt.toUserAccount === address) solDelta += amt;
        if (nt.fromUserAccount === address) solDelta -= amt;
      }
    }

    // Compute net token changes
    const tokenDeltas = new Map<string, number>();
    if (tx.tokenTransfers) {
      for (const tt of tx.tokenTransfers) {
        const amt = tt.tokenAmount || 0;
        const prev = tokenDeltas.get(tt.mint) || 0;
        if (tt.toUserAccount === address) {
          tokenDeltas.set(tt.mint, prev + amt);
        }
        if (tt.fromUserAccount === address) {
          tokenDeltas.set(tt.mint, prev - amt);
        }
      }
    }

    if (isSwap) {
      // ── Swap transaction ──
      // SOL went out + tokens came in → bought tokens with SOL
      // SOL came in + tokens went out → sold tokens for SOL
      const solOut = Math.max(0, -solDelta);
      const solIn = Math.max(0, solDelta);

      for (const [mint, delta] of tokenDeltas.entries()) {
        const tracker = getTracker(mint);
        if (delta > 0 && solOut > 0) {
          // Bought tokens: SOL went out, tokens came in
          tracker.solSpent += solOut;
          tracker.tokensBought += delta;
        } else if (delta < 0 && solIn > 0) {
          // Sold tokens: tokens went out, SOL came in
          tracker.solReceived += solIn;
          tracker.tokensSold += Math.abs(delta);
          cumulativeRealizedSol += solIn;
        }
      }
    } else {
      // ── Non-swap: plain transfer / deposit / withdrawal ──
      if (solDelta > 0) totalSolDeposited += solDelta;
      if (solDelta < 0) totalSolWithdrawn += Math.abs(solDelta);
    }

    runningSolBalance += solDelta;
    if (runningSolBalance > peakSolBalance) {
      peakSolBalance = runningSolBalance;
    }

    // Estimate portfolio value after this tx:
    // SOL balance + value of token positions based on cost basis
    // (We don't have historical prices, so we estimate token value as
    //  proportional to SOL spent on them that hasn't been recovered yet)
    let tokenHoldingsEstimateSol = 0;
    for (const t of tokenMap.values()) {
      const netSolInvested = t.solSpent - t.solReceived;
      if (netSolInvested > 0) {
        // Tokens still held — estimate value as at least what was spent
        // (optimistic, but gives us a better peak estimate)
        const fractionHeld =
          t.tokensBought > 0
            ? Math.max(0, t.tokensBought - t.tokensSold) / t.tokensBought
            : 0;
        tokenHoldingsEstimateSol += t.solSpent * fractionHeld;
      }
    }

    const estimatedTotalSol =
      Math.max(0, runningSolBalance) + tokenHoldingsEstimateSol;
    if (estimatedTotalSol > peakCumulativeValue) {
      peakCumulativeValue = estimatedTotalSol;
    }
  }

  // ── Compute USD values ──
  const peakEstimatedValue = peakCumulativeValue * solPrice;
  const totalInflow = totalSolDeposited * solPrice;
  const totalOutflow = totalSolWithdrawn * solPrice;

  const oldestTxDate = sorted[0]?.timestamp
    ? new Date(sorted[0].timestamp * 1000).toISOString()
    : null;
  const newestTxDate = sorted[sorted.length - 1]?.timestamp
    ? new Date(sorted[sorted.length - 1].timestamp * 1000).toISOString()
    : null;

  return {
    totalInflow,
    totalOutflow,
    peakEstimatedValue,
    currentEstimatedValue: 0, // will be set from snapshot
    painScore: 0, // will be computed in analyzeWallet
    roundtripAmount: 0,
    transactionCount: allTxns.length,
    oldestTxDate,
    newestTxDate,
  };
}

/* ───── Public entry point ───── */

export async function analyzeWallet(address: string): Promise<WalletAnalysis> {
  const solPrice = await getSolPrice();

  const [snapshot, summary] = await Promise.all([
    getCurrentBalances(address),
    analyzeHistory(address, solPrice),
  ]);

  // Current value from live portfolio snapshot (most accurate)
  summary.currentEstimatedValue = snapshot.totalUsdValue;

  // If our peak estimate is somehow lower than current value,
  // current IS the peak (wallet is still in profit)
  if (summary.peakEstimatedValue < snapshot.totalUsdValue) {
    summary.peakEstimatedValue = snapshot.totalUsdValue;
  }

  // Pain Score = how much was roundtripped (peak minus current)
  summary.painScore = Math.max(
    0,
    summary.peakEstimatedValue - snapshot.totalUsdValue
  );
  summary.roundtripAmount = summary.painScore;

  return {
    address,
    snapshot,
    summary,
    qualified: summary.painScore >= 20_000,
    timestamp: Date.now(),
  };
}
