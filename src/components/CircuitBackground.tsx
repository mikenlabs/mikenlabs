export function CircuitBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="animate-circuit h-full w-full"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <defs>
          <linearGradient id="circuit-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.19 257)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.72 0.15 256)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <g stroke="url(#circuit-line)" strokeWidth="1.2" fill="none">
          <path d="M0 140 H320 L380 200 H640" />
          <path d="M0 320 H180 L240 260 H520 L580 320 H900" />
          <path d="M1440 220 H1120 L1060 280 H760" />
          <path d="M1440 460 H1180 L1120 520 H820" />
          <path d="M120 900 V640 L180 580 V360" />
          <path d="M1320 900 V700 L1260 640 V420" />
          <path d="M640 0 V120 L700 180 V360" />
          <path d="M820 900 V720 L880 660 V480" />
        </g>
        <g fill="oklch(0.72 0.15 256)">
          <circle cx="640" cy="200" r="4" />
          <circle cx="900" cy="320" r="4" />
          <circle cx="760" cy="280" r="4" />
          <circle cx="180" cy="360" r="4" />
          <circle cx="1260" cy="420" r="4" />
          <circle cx="700" cy="180" r="4" />
          <circle cx="820" cy="480" r="4" />
        </g>
      </svg>
    </div>
  );
}
