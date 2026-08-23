import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--sidebar-bg)] border-t-[3px] border-ink py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={24} className="text-primary" />
              <span className="font-heading font-bold text-xl uppercase">
                ChainCodeCamp
              </span>
            </div>
            <p className="font-body text-sm text-gray-600 max-w-xs leading-relaxed">
              Free, structured smart contract security education for African and
              self-taught devs who can&apos;t afford $5k bootcamps. Real audits.
              Real bugs. Real careers.
            </p>
            <p className="font-mono text-xs text-gray-400 mt-4">
              Inspired by{" "}
              <a
                href="https://github.com/freeCodeCamp/freeCodeCamp"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                freeCodeCamp
              </a>{" "}
              &amp;{" "}
              <a
                href="https://github.com/Cyfrin/security-and-auditing-full-course-s23"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Cyfrin Updraft
              </a>
              . Built different.
            </p>
          </div>

          {/* Curriculum */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-4 border-b-2 border-ink inline-block">
              Curriculum
            </h4>
            <ul className="space-y-2">
              {[
                ["EVM Fundamentals", "/curriculum/evm-fundamentals"],
                ["Solidity Mastery", "/curriculum/solidity-mastery"],
                ["Assembly & Yul", "/curriculum/assembly-and-yul"],
                ["Vulnerability Classes", "/curriculum/vulnerability-classes"],
                ["Audit Reports", "/curriculum/writing-audit-reports"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-heading font-semibold text-sm uppercase text-gray-600 no-underline hover:text-primary hover:bg-transparent transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-4 border-b-2 border-ink inline-block">
              Community
            </h4>
            <ul className="space-y-2">
              {[
                ["Discord", "https://discord.gg/chaincodecamp"],
                ["GitHub", "https://github.com/GoodnessFx/ChainCodeCamp"],
                ["Bug Bounties", "/community#bounties"],
                ["Leaderboard", "/community#leaderboard"],
                ["Certificate", "/certificate"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="font-heading font-semibold text-sm uppercase text-gray-600 no-underline hover:text-primary hover:bg-transparent transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t-2 border-ink flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-gray-400">
            &copy; {year} CHAINCODECAMP. FREE FOREVER. OPEN SOURCE.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/GoodnessFx/ChainCodeCamp"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-gray-400 no-underline hover:text-primary hover:bg-transparent transition-colors"
            >
              GITHUB
            </a>
            <Link
              href="/curriculum"
              className="font-mono text-xs text-gray-400 no-underline hover:text-primary hover:bg-transparent transition-colors"
            >
              CURRICULUM
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
