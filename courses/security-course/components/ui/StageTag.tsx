interface Props {
  stage: string;
  track?: string;
  className?: string;
}

const TRACK_COLORS: Record<string, string> = {
  foundations: "bg-secondary text-white",
  security: "bg-primary text-white",
  advanced: "bg-ink text-white",
};

export default function StageTag({ stage, track = "foundations", className = "" }: Props) {
  const color = TRACK_COLORS[track] ?? "bg-ink text-white";
  return (
    <span
      className={`inline-block font-mono text-xs font-bold px-2 py-0.5 uppercase border-2 border-ink ${color} ${className}`}
    >
      Stage {stage}
    </span>
  );
}
