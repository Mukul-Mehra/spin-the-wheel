/** Decorative diya (oil lamp) SVG with animated glow */

export function Diya({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`diya-glow ${className}`}
      fill="none"
    >
      {/* Flame */}
      <path
        d="M32 4 C 28 12, 24 16, 28 24 C 29 27, 31 28, 32 28 C 33 28, 35 27, 36 24 C 40 16, 36 12, 32 4 Z"
        fill="url(#flameGrad)"
      />
      {/* Flame inner */}
      <path
        d="M32 10 C 30 14, 28 17, 30 22 C 31 24, 32 25, 32 25 C 33 25, 34 24, 34 22 C 36 17, 34 14, 32 10 Z"
        fill="#fef3c7"
      />
      {/* Lamp body */}
      <path
        d="M12 42 C 12 38, 16 35, 20 35 L 44 35 C 48 35, 52 38, 52 42 C 52 48, 48 54, 42 54 L 22 54 C 16 54, 12 48, 12 42 Z"
        fill="url(#bowlGrad)"
      />
      {/* Rim */}
      <ellipse cx="32" cy="35" rx="14" ry="3" fill="#9c7016" />
      <ellipse cx="32" cy="34.5" rx="12" ry="2" fill="#d4a017" />
      <defs>
        <linearGradient id="flameGrad" x1="32" y1="4" x2="32" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="bowlGrad" x1="12" y1="35" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d4a017" />
          <stop offset="0.5" stopColor="#9c7016" />
          <stop offset="1" stopColor="#6b4a00" />
        </linearGradient>
      </defs>
    </svg>
  );
}
