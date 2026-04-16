import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || "";
const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const HELIUS_API = `https://api.helius.xyz/v0`;

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

// Fetch current balances for a wallet
async function getCurrentBalances(address: string): Promise<WalletSnapshot> {
  const connection = new Connection(HELIUS_RPC);
  const pubkey = new PublicKey(address);

  // Get SOL balance
  const solBalance = await connection.getBalance(pubkey);
  const solInSol = solBalance / LAMPORTS_PER_SOL;

  // Get SOL price estimate (simplified)
  let solPrice = 150; // fallback
  try {
    const priceRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
    );
    const priceData = await priceRes.json();
    if (priceData?.solana?.usd) solPrice = priceData.solana.usd;
  } catch {
    // use fallback
  }

  const solUsdValue = solInSol * solPrice;

  // Get token accounts via Helius DAS
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
        if (info && info.price_info?.total_price) {
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
    // token fetch failed
  }

  const totalUsdValue =
    solUsdValue + tokenBalances.reduce((s, t) => s + t.usdValue, 0);

  return { solBalance: solInSol, solUsdValue, tokenBalances, totalUsdValue };
}

// Analyze transaction history to estimate peak value and roundtrip
async function analyzeHistory(address: string): Promise<TransactionSummary> {
  let allTxns: Array<{
    timestamp: number;
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
    }>;
  }> = [];

  try {
    // Fetch parsed transaction history via Helius
    const res = await fetch(
      `${HELIUS_API}/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}&limit=100`
    );
    allTxns = await res.json();
  } catch {
    // API call failed
  }

  if (!Array.isArray(allTxns) || allTxns.length === 0) {
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

  // Track SOL flows
  let totalInflow = 0;
  let totalOutflow = 0;
  let runningBalance = 0;
  let peakBalance = 0;

  // Sort by timestamp ascending
  const sorted = [...allTxns].sort(
    (a, b) => (a.timestamp || 0) - (b.timestamp || 0)
  );

  for (const tx of sorted) {
    if (tx.nativeTransfers) {
      for (const nt of tx.nativeTransfers) {
        const amountSol = nt.amount / LAMPORTS_PER_SOL;
        if (nt.toUserAccount === address) {
          totalInflow += amountSol;
          runningBalance += amountSol;
        }
        if (nt.fromUserAccount === address) {
          totalOutflow += amountSol;
          runningBalance -= amountSol;
        }
      }
    }
    if (runningBalance > peakBalance) peakBalance = runningBalance;
  }

  // Rough USD estimates using SOL price
  let solPrice = 150;
  try {
    const priceRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
    );
    const priceData = await priceRes.json();
    if (priceData?.solana?.usd) solPrice = priceData.solana.usd;
  } catch {
    // fallback
  }

  const peakEstimatedValue = peakBalance * solPrice;
  const currentBalance = runningBalance > 0 ? runningBalance : 0;
  const currentEstimatedValue = currentBalance * solPrice;
  const painScore = Math.max(0, peakEstimatedValue - currentEstimatedValue);
  const roundtripAmount = painScore;

  const oldestTxDate = sorted[0]?.timestamp
    ? new Date(sorted[0].timestamp * 1000).toISOString()
    : null;
  const newestTxDate = sorted[sorted.length - 1]?.timestamp
    ? new Date(sorted[sorted.length - 1].timestamp * 1000).toISOString()
    : null;

  return {
    totalInflow: totalInflow * solPrice,
    totalOutflow: totalOutflow * solPrice,
    peakEstimatedValue,
    currentEstimatedValue,
    painScore,
    roundtripAmount,
    transactionCount: allTxns.length,
    oldestTxDate,
    newestTxDate,
  };
}

export async function analyzeWallet(address: string): Promise<WalletAnalysis> {
  const [snapshot, summary] = await Promise.all([
    getCurrentBalances(address),
    analyzeHistory(address),
  ]);

  // Refine pain score with actual current value
  const refinedPain = Math.max(
    0,
    summary.peakEstimatedValue - snapshot.totalUsdValue
  );
  summary.painScore = Math.max(summary.painScore, refinedPain);
  summary.currentEstimatedValue = snapshot.totalUsdValue;

  return {
    address,
    snapshot,
    summary,
    qualified: summary.painScore >= 20_000,
    timestamp: Date.now(),
  };
}
