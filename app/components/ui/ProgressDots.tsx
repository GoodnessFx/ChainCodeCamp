"use client";

interface Props {
  total: number;
  current: number; // 1-indexed
  completed: number[]; // 1-indexed completed indices
}

export default function ProgressDots({ total, current, completed }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {Array.from({ length: total }, (_, i) => {
        const idx = i + 1;
        const isDone = completed.includes(idx);
        const isCurrent = idx === current;
        return (
          <div
            key={idx}
            className={[
              "w-3 h-3 rounded-full border-2 border-ink transition-colors",
              isDone ? "bg-primary" : isCurrent ? "bg-secondary" : "bg-transparent",
            ].join(" ")}
            title={`Section ${idx}`}
          />
        );
      })}
    </div>
  );
}
