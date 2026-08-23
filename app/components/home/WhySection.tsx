const PILLARS = [
  {
    label: "01",
    title: "No Paywall on Core Content",
    body: "Every lesson, every exploit challenge, every audit template is free. Paywall (if any) goes on 1-on-1 mentorship or fast-track cohorts — not the curriculum.",
  },
  {
    label: "02",
    title: "Real Contracts, Real Bugs",
    body: "Every vulnerability example has a deployed contract or historical hack behind it. No invented toy code. You study the $197M Euler bug, not a contrived classroom example.",
  },
  {
    label: "03",
    title: "African Context Built In",
    body: "Gas costs in naira terms. Case studies of hacks on African-built protocols. Local stablecoin rails (cNGN). The ecosystem closest to you, not just Silicon Valley DeFi.",
  },
  {
    label: "04",
    title: "Direct Pipeline to Paid Work",
    body: "The curriculum ends with a live Code4rena/Sherlock submission guide, a bug bounty tracker, and an alumni leaderboard. Not a certificate and goodbye.",
  },
];

export default function WhySection() {
  return (
    <section className="bg-[var(--sidebar-bg)] border-t-2 border-b-2 border-ink py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-bold text-3xl border-b-4 border-ink pb-1 inline-block mb-4">
          What Makes This Different
        </h2>
        <p className="font-body text-gray-600 mb-12 max-w-2xl">
          freeCodeCamp&apos;s polish applied to smart contract security. Cyfrin&apos;s
          depth adapted for self-taught builders. The gap between them is where
          ChainCodeCamp lives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PILLARS.map(({ label, title, body }) => (
            <div
              key={label}
              className="bg-white border-2 border-ink p-6 shadow-hard hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg transition-all"
            >
              <span className="font-mono text-xs font-bold text-primary tracking-widest block mb-3">
                {label}
              </span>
              <h3 className="font-heading font-bold text-lg mb-3">{title}</h3>
              <p className="font-body text-sm text-gray-600 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
