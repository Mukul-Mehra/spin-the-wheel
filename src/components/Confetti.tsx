import { useMemo } from 'react';

const CONFETTI_COLORS = [
  '#fbbf24',
  '#f59e0b',
  '#e0709a',
  '#c44569',
  '#f7d0db',
  '#d4a017',
  '#f0a5b8',
  '#9c2747',
];

export function Confetti({ count = 40 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const isCircle = Math.random() > 0.6;
        return {
          id: i,
          left: Math.random() * 100,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          size: 8 + Math.random() * 8,
          delay: Math.random() * 0.5,
          duration: 1.8 + Math.random() * 1.2,
          isCircle,
          rotate: Math.random() * 360,
        };
      }),
    [count],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: p.isCircle ? `${p.size}px` : `${p.size * 1.4}px`,
            background: p.color,
            borderRadius: p.isCircle ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
