interface HackProps {
  name: string;
  amount: string;
  year: number;
  vector: string;
}

export default function HackCallout({ name, amount, year, vector }: HackProps) {
  return (
    <div className="border-l-4 border-error bg-red-50 px-6 py-4 my-8 border-2 border-ink shadow-hard">
      <p className="font-mono text-xs font-bold text-error uppercase tracking-widest mb-2">
        Real Hack — This Is Why It Matters
      </p>
      <h4 className="font-heading font-bold text-lg mb-1">
        {name} ({year}) — {amount}
      </h4>
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        <strong>Vector:</strong> {vector}
      </p>
    </div>
  );
}
