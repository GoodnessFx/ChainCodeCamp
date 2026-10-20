export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="ChainCodeCamp logo"
    >
      <path
        d="M24 3 6 10v13c0 11 7.5 19.6 18 22 10.5-2.4 18-11 18-22V10L24 3z"
        fill="currentColor"
      />
      <path
        d="M17 24l5 5 9-11"
        fill="none"
        stroke="#09090b"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
