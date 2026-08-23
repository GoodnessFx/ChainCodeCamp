const COLORS = {
  beginner: "bg-success text-white",
  intermediate: "bg-secondary text-white",
  advanced: "bg-primary text-white",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: "beginner" | "intermediate" | "advanced";
}) {
  return (
    <span
      className={`inline-block font-mono text-xs font-bold px-2 py-0.5 uppercase border-2 border-ink ${COLORS[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
