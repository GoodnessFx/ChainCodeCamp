"use client";

import ShellLayout from "@/components/ShellLayout";
import { ExternalLink, Trophy, Users, Zap, MessageSquare, Star, GitFork } from "lucide-react";

const BOUNTY_PLATFORMS = [
  {
    name: "Immunefi",
    url: "https://immunefi.com/explore/",
    maxPayout: "$10M+",
    description: "Bug bounties on live protocols. Highest payouts in the industry.",
    status: "live",
    focus: "DeFi, Bridges, CEX",
  },
  {
    name: "Code4rena",
    url: "https://code4rena.com/contests",
    maxPayout: "$200k/contest",
    description: "Competitive audits. Prize pool split among valid finders.",
    status: "live",
    focus: "EVM protocols",
  },
  {
    name: "Sherlock",
    url: "https://app.sherlock.xyz/audits/contests",
    maxPayout: "Fixed per finding",
    description: "Strict severity standards, fixed payouts per valid bug.",
    status: "live",
    focus: "DeFi, Stablecoins",
  },
  {
    name: "Cantina",
    url: "https://cantina.xyz/competitions",
    maxPayout: "Variable",
    description: "Cyfrin's competitive audit platform. Good for growing reputation.",
    status: "live",
    focus: "All EVM",
  },
  {
    name: "Codehawks",
    url: "https://codehawks.cyfrin.io",
    maxPayout: "Variable",
    description: "Beginner-friendly. Lower competition, good for first submissions.",
    status: "live",
    focus: "All EVM",
  },
];

const LEADERBOARD = [
  { rank: 1, handle: "You could be here", findings: "—", earned: "—", platform: "—" },
  { rank: 2, handle: "Submit your first finding", findings: "—", earned: "—", platform: "—" },
  { rank: 3, handle: "Track your wins", findings: "—", earned: "—", platform: "—" },
];

const COMMUNITY_LINKS = [
  {
    icon: <MessageSquare size={22} className="text-primary" />,
    label: "Discord",
    description: "Ask questions, share findings, get feedback on your reports.",
    url: "https://discord.gg/chaincodecamp",
    cta: "Join Server",
  },
  {
    icon: <GitFork size={22} className="text-primary" />,
    label: "GitHub",
    description: "Fork the curriculum, fix errors, add case studies. All contributions credited.",
    url: "https://github.com/GoodnessFx/ChainCodeCamp",
    cta: "View Repo",
  },
  {
    icon: <Star size={22} className="text-primary" />,
    label: "Audit Clinic",
    description: "Submit a contract for public community review. Reviewer gets full credit in the report.",
    url: "https://discord.gg/chaincodecamp",
    cta: "Submit Contract",
  },
];

export default function CommunityPage() {
  return (
    <ShellLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-2">Community</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Build in public. Find bugs. Get paid.
          </h1>
          <p className="font-body text-gray-600 text-lg max-w-2xl leading-relaxed">
            ChainCodeCamp alumni finding real bugs on real protocols. No clout-chasing,
            no hype — just the work.
          </p>
        </div>

        {/* Community links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {COMMUNITY_LINKS.map(({ icon, label, description, url, cta }) => (
            <div key={label} className="bg-white border-2 border-ink p-6 shadow-hard hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a] transition-all">
              <div className="mb-3">{icon}</div>
              <h3 className="font-heading font-bold text-lg mb-2">{label}</h3>
              <p className="font-body text-sm text-gray-600 leading-relaxed mb-5">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-xs py-2 px-4 gap-2 inline-flex"
              >
                {cta} <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>

        {/* Bug Bounty Tracker */}
        <section id="bounties" className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={24} className="text-primary" />
            <h2 className="font-heading font-bold text-3xl border-b-4 border-primary pb-1 inline-block text-primary">
              Bug Bounty Tracker
            </h2>
          </div>
          <p className="font-body text-gray-600 mb-8 max-w-2xl">
            Live platforms where you can earn today. No signup walls on this list —
            just go and audit.
          </p>

          <div className="space-y-3">
            {BOUNTY_PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border-2 border-ink px-5 py-4 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all"
              >
                {/* Status dot */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-success border border-ink flex-shrink-0" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-success">
                    {p.status}
                  </span>
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-base">{p.name}</p>
                  <p className="font-body text-sm text-gray-500 truncate">{p.description}</p>
                </div>

                {/* Focus */}
                <span className="font-mono text-xs text-gray-400 hidden md:block flex-shrink-0">
                  {p.focus}
                </span>

                {/* Max payout */}
                <span className="font-heading font-bold text-sm text-primary flex-shrink-0">
                  {p.maxPayout}
                </span>

                {/* Link */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline text-xs py-2 px-3 gap-1 flex-shrink-0"
                >
                  Audit <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section id="leaderboard" className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={24} className="text-primary" />
            <h2 className="font-heading font-bold text-3xl border-b-4 border-ink pb-1 inline-block">
              Alumni Leaderboard
            </h2>
          </div>
          <p className="font-body text-gray-600 mb-8 max-w-2xl">
            ChainCodeCamp alumni who&apos;ve landed verified paid findings.
            Complete the curriculum and submit your first finding to appear here.
          </p>

          <div className="border-2 border-ink overflow-hidden shadow-hard">
            {/* Table header */}
            <div className="grid grid-cols-5 bg-ink text-white px-5 py-3">
              {["Rank", "Handle", "Findings", "Earned", "Platform"].map((h) => (
                <span key={h} className="font-mono text-xs font-bold uppercase tracking-widest">
                  {h}
                </span>
              ))}
            </div>

            {LEADERBOARD.map(({ rank, handle, findings, earned, platform }) => (
              <div
                key={rank}
                className="grid grid-cols-5 items-center px-5 py-4 border-b-2 border-ink last:border-0 bg-white hover:bg-[var(--primary-light)] transition-colors"
              >
                <span className="font-heading font-bold text-lg text-primary">
                  {rank}
                </span>
                <span className="font-heading font-bold text-sm text-gray-600 col-span-2">
                  {handle}
                </span>
                <span className="font-mono text-xs text-gray-400">{findings}</span>
                <span className="font-mono text-xs text-gray-400">{earned}</span>
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-gray-400 mt-3">
            To appear here: complete the curriculum → submit a verified finding →
            share your result in Discord.
          </p>
        </section>

        {/* African context section */}
        <section className="bg-ink text-white border-2 border-ink p-8 shadow-hard">
          <div className="flex items-center gap-3 mb-4">
            <Users size={22} className="text-primary" />
            <h2 className="font-heading font-bold text-2xl">Built for African Devs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Gas in Naira Terms",
                body: "A cold SLOAD at 20 gwei costs ~₦180 at current rates. Understanding cost in local currency changes how you think about optimisation.",
              },
              {
                title: "Local Protocol Case Studies",
                body: "Hacks on African-built or African-used protocols get dedicated coverage here — not a footnote in a US-centric curriculum.",
              },
              {
                title: "No $5k Bootcamp Required",
                body: "The full curriculum is free. If you have internet access and can run a terminal, you have everything you need to start.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="font-heading font-bold text-base text-primary mb-2">
                  {title}
                </h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ShellLayout>
  );
}
