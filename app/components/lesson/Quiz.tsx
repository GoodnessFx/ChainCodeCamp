"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from "lucide-react";
import type { LessonQuestion } from "@/types/curriculum";

interface Props {
  questions: LessonQuestion[];
  title?: string;
}

/**
 * Graded quiz. Answers are revealed only after "Check answers" so the
 * learner commits to a choice first. Explanations (`why`) show per question.
 */
export default function Quiz({ questions, title }: Props) {
  const [picked, setPicked] = useState<(number | null)[]>(() =>
    questions.map(() => null)
  );
  const [checked, setChecked] = useState(false);

  if (questions.length === 0) return null;

  const score = picked.filter((p, i) => p === questions[i].answer).length;

  const reset = () => {
    setPicked(questions.map(() => null));
    setChecked(false);
  };

  return (
    <section className="my-10 border-2 border-ink bg-white shadow-hard">
      <div className="flex items-center gap-2 bg-ink px-4 py-2">
        <HelpCircle size={14} className="text-white/70" />
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
          {title ?? "Quiz"}
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-white/50">
          {questions.length} questions
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {questions.map((q, qi) => (
          <div key={qi} className="px-4 py-5">
            <p className="font-body text-sm font-semibold text-gray-800 mb-3">
              <span className="mr-2 font-mono text-xs font-bold text-primary">
                {qi + 1}.
              </span>
              {q.q}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isPicked = picked[qi] === oi;
                const isAnswer = oi === q.answer;
                let cls =
                  "border-2 border-ink bg-white hover:shadow-hard hover:-translate-y-0.5";
                if (checked && isAnswer) cls = "border-2 border-ink bg-success text-white";
                else if (checked && isPicked && !isAnswer)
                  cls = "border-2 border-ink bg-error text-white";
                else if (checked) cls = "border-2 border-gray-300 bg-white text-gray-500";
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={checked}
                    onClick={() =>
                      setPicked((prev) => prev.map((p, i) => (i === qi ? oi : p)))
                    }
                    className={`flex w-full items-start gap-2.5 px-3 py-2.5 text-left font-body text-sm transition-all ${cls}`}
                  >
                    <span className="font-mono text-xs font-bold opacity-70 mt-0.5">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    <span>{opt}</span>
                    {checked && isAnswer && (
                      <CheckCircle2 size={16} className="ml-auto mt-0.5 flex-shrink-0" />
                    )}
                    {checked && isPicked && !isAnswer && (
                      <XCircle size={16} className="ml-auto mt-0.5 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            {checked && q.why && (
              <p className="mt-3 border-l-4 border-secondary bg-blue-50 px-3 py-2 font-body text-xs leading-relaxed text-gray-700">
                <strong className="font-heading uppercase text-secondary">Why: </strong>
                {q.why}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t-2 border-ink bg-paper px-4 py-3">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={picked.some((p) => p === null)}
            className="border-2 border-ink bg-primary px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-white shadow-hard transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Check answers
          </button>
        ) : (
          <>
            <span className="font-heading text-sm font-bold uppercase">
              Score: {score}/{questions.length}
              {score === questions.length && " - perfect. Move on."}
            </span>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 border-2 border-ink bg-white px-3 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-all hover:shadow-hard"
            >
              <RotateCcw size={13} /> Try again
            </button>
          </>
        )}
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
          {picked.filter((p) => p !== null).length}/{questions.length} answered
        </span>
      </div>
    </section>
  );
}
