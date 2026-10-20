"use client";

// Live stats bar — numbers are seeded; wire to Supabase aggregate queries later
const STATS = [
  { value: "10", label: "Curriculum Sections" },
  { value: "9", label: "Exploit Challenges" },
  { value: "$1.7B+", label: "Hacks Studied" },
  { value: "Free", label: "Forever. No Paywall." },
];

export default function StatsBar() {
  return (
    <div className="bg-ink text-white border-b-2 border-ink">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-white/20">
        {STATS.map(({ value, label }) => (
          <div key={label} className="px-6 py-5 text-center">
            <p
              className="font-heading font-bold text-primary"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {value}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-white/60 mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
