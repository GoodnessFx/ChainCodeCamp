import type { ReactNode } from "react";
import {
  Target,
  Wrench,
  Bug,
  Search,
  CheckCircle2,
  Flag,
  PlayCircle,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

/**
 * The CCC lesson block set. Every security lesson is built from these:
 * Goal, Concept, Do it, See it break, Spot it, Fix it, Quiz, Challenge,
 * Real-world case (HackCallout) plus Diagram / Expected / UpdraftVideo.
 *
 * All are server components. Markdown inside a block works, but keep a
 * blank line after the opening tag and do not indent the markdown, or MDX
 * turns it into a code block.
 */

type Tone = "orange" | "red" | "blue" | "green" | "ink";

const HEADER_TONE: Record<Tone, string> = {
  orange: "bg-primary text-white",
  red: "bg-error text-white",
  blue: "bg-secondary text-white",
  green: "bg-success text-white",
  ink: "bg-ink text-white",
};

function Block({
  label,
  note,
  tone,
  children,
}: {
  label: string;
  note?: string;
  tone: Tone;
  children: ReactNode;
}) {
  return (
    <section className="my-8 border-2 border-ink bg-white shadow-hard">
      <div className={`flex items-center gap-2 px-4 py-2 ${HEADER_TONE[tone]}`}>
        <span className="font-mono text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      {note && (
        <p className="px-4 pt-3 font-mono text-[11px] uppercase tracking-wide text-gray-400">
          {note}
        </p>
      )}
      <div className={note ? "px-4 pb-4 pt-2" : "px-4 py-4"}>{children}</div>
    </section>
  );
}

/** One-line goal. Rendered automatically from frontmatter `goal`, or inline. */
export function GoalLine({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 flex items-start gap-3 border-2 border-l-8 border-ink border-l-primary bg-[var(--primary-light)] px-4 py-3">
      <Target size={18} className="mt-0.5 flex-shrink-0 text-primary" />
      <p className="font-body text-sm leading-relaxed text-gray-800">
        <span className="mr-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
          Goal
        </span>
        <strong className="font-bold text-ink">{children}</strong>
      </p>
    </div>
  );
}

export function DoIt({ note, children }: { note?: string; children: ReactNode }) {
  return (
    <Block label="Do it" note={note} tone="orange">
      {children}
    </Block>
  );
}

export function BreakIt({ note, children }: { children: ReactNode; note?: string }) {
  return (
    <Block label="See it break" note={note} tone="red">
      {children}
    </Block>
  );
}

export function SpotIt({ note, children }: { children: ReactNode; note?: string }) {
  return (
    <Block label="Spot it in any codebase" note={note} tone="blue">
      {children}
    </Block>
  );
}

export function FixIt({ note, children }: { children: ReactNode; note?: string }) {
  return (
    <Block label="Fix it, then re-run" note={note} tone="green">
      {children}
    </Block>
  );
}

export function Challenge({ note, children }: { children: ReactNode; note?: string }) {
  return (
    <Block label="Mini challenge" note={note ?? "In your own repo. Push when green."} tone="ink">
      {children}
    </Block>
  );
}

/** Real terminal output the learner should see. Dark, green, copyable at a glance. */
export function Expected({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border-2 border-ink bg-[#0d1117]">
      <div className="border-b border-white/10 px-4 py-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
          Expected output
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-sm leading-relaxed text-[#7ee787]">
        {children}
      </pre>
    </div>
  );
}

/**
 * Lazy-loaded diagram frame. Pass an Excalidraw export/share link (or any
 * image URL) as src. Iframes and images load only when scrolled into view,
 * which keeps low-data mobile sessions cheap.
 */
export function Diagram({
  src,
  title,
  height = 420,
}: {
  src: string;
  title?: string;
  height?: number;
}) {
  const label = title ?? "Diagram";
  const isImage = /\.(png|jpg|jpeg|svg|webp)(\?|$)/i.test(src);
  return (
    <figure className="my-8 border-2 border-ink bg-white shadow-hard">
      <figcaption className="flex items-center gap-2 border-b-2 border-ink bg-ink px-4 py-2">
        <ImageIcon size={13} className="text-white/60" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70">
          {label}
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white"
        >
          Open full size <ExternalLink size={11} />
        </a>
      </figcaption>
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="w-full bg-paper"
          style={{ minHeight: 160 }}
        />
      ) : (
        <iframe
          src={src}
          title={label}
          loading="lazy"
          className="w-full border-0 bg-paper"
          style={{ height }}
        />
      )}
    </figure>
  );
}

/** "Watch the video version" row, links to the matching Cyfrin Updraft lesson. */
export function UpdraftVideo({ href, title }: { href: string; title?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 flex items-center gap-3 border-2 border-ink bg-white px-4 py-3 no-underline transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
    >
      <PlayCircle size={22} className="flex-shrink-0 text-primary" />
      <span className="min-w-0">
        <span className="block font-heading text-sm font-bold uppercase tracking-wide text-ink">
          Watch the video version
        </span>
        <span className="block truncate font-body text-xs text-gray-500">
          {title ?? "Matching lesson on Cyfrin Updraft"}
        </span>
      </span>
      <ExternalLink size={14} className="ml-auto flex-shrink-0 text-gray-400" />
    </a>
  );
}
