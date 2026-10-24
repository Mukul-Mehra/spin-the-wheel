import { useMemo } from 'react';

const PETAL_COLORS = [
  '#e0709a',
  '#f0a5b8',
  '#f7d0db',
  '#fbbf24',
  '#f59e0b',
  '#c44569',
  '#fce8f0',
];

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 10 + Math.random() * 12;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
          duration: 8 + Math.random() * 10,
          delay: Math.random() * 12,
          borderRadius:
            Math.random() > 0.5
              ? '50% 0 50% 0'
              : '50% 50% 50% 50%',
        };
      }),
    [count],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.borderRadius,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
