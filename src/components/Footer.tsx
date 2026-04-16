export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* ISI Bar — Important Safety Information (pharma parody) */}
      <div className="isi-bar px-4 sm:px-6 py-4">
        <div className="mx-auto max-w-5xl">
          <p className="font-bold text-foreground text-xs mb-1">
            Important Safety Information:
          </p>
          <p>
            Side effects of Roundtrippers Anonymous may include increased self-awareness, severe
            realization, introspection, and an understanding of stop-losses. Do not take
            ROUNDTRIP-A if you are experiencing irreversible capitulation. Talk to your
            licensed Wojak-Guide today. ROUNDTRIP-A has not been approved by the FDA or the SEC.
            Keep out of reach of all high-leverage traders. This is not medical or financial
            advice. We just really feel for you. Use at your own risk. (lol)
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-clinical-blue-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">
                Roundtrippers Anonymous
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Trauma &amp; Trading Solutions. A wallet-verified recovery
                community for those who roundtripped their gains back to zero.
                Hedged by reality.
              </p>
              <p className="text-xs text-white/50 mt-3">
                &copy; 2024 RTA &middot; All Gains Reserved (and Lost)
              </p>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider mb-3 text-white/80">
                Programs &amp; Services
              </h4>
              <ul className="space-y-1.5 text-xs text-white/60">
                <li>Chronic Roundtrip Syndrome (CRS) Assessment</li>
                <li>COPE-A-ZINE&trade; Treatment Plans</li>
                <li>Group Trauma Bonding Sessions</li>
                <li>R.A.G.E. Group Experience</li>
                <li>Bagholder Anonymous &mdash; Group Room 2</li>
              </ul>
            </div>

            {/* Contact / Disclaimer */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider mb-3 text-white/80">
                Get Help Now
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Crisis Hotline: <span className="text-white font-medium">1-800-FUMBLED</span>
              </p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                If you or someone you love is experiencing a roundtrip, you are
                not alone. Our certified Wojak-Guides are available 24/7 during
                market hours (which is always).
              </p>
              <p className="text-[10px] text-white/40 mt-4">
                This is a meme / satire project. Not financial advice. Obviously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
