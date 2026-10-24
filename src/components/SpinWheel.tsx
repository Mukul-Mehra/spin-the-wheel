import { useCallback, useEffect, useRef, useState } from 'react';
import { PRIZES, type Prize, pickWeightedPrize } from '@/data/prizes';

interface SpinWheelProps {
  onResult: (prize: Prize) => void;
  onTick: () => void;
  /** Increments to force-enable spin (staff reset) */
  resetToken: number;
}

const SIZE = 340;
const R = SIZE / 2;
const STROKE = 3;
const segmentAngle = 360 / PRIZES.length;

export function SpinWheel({ onResult, onTick, resetToken }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const tickIntervalRef = useRef<number | null>(null);

  // Reset when staff presses reset
  useEffect(() => {
    if (resetToken > 0) {
      setSpinning(false);
      setHasSpun(false);
      setRotation(0);
    }
  }, [resetToken]);

  const stopTicks = useCallback(() => {
    if (tickIntervalRef.current !== null) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  useEffect(() => stopTicks, [stopTicks]);

  const spin = useCallback(() => {
    if (spinning || hasSpun) return;

    const prizeIndex = pickWeightedPrize();
    // Angle so the pointer (at top, 0deg) lands in the middle of the chosen segment
    const targetAngle =
      360 * 5 + (360 - (prizeIndex * segmentAngle + segmentAngle / 2));
    // Add slight randomness within the segment for realism
    const jitter = (Math.random() - 0.5) * (segmentAngle * 0.5);
    const finalRotation = targetAngle + jitter;

    setSpinning(true);
    setHasSpun(true);

    // Gradually slow down the tick sound
    let tickDelay = 80;
    const tickSchedule = () => {
      onTick();
      tickIntervalRef.current = window.setTimeout(() => {
        tickDelay = Math.min(tickDelay + 12, 250);
        tickSchedule();
      }, tickDelay) as unknown as number;
    };
    tickSchedule();

    // Animate rotation via CSS transition
    setRotation((prev) => prev + finalRotation);

    // Call onResult after the CSS transition ends
    window.setTimeout(() => {
      stopTicks();
      setSpinning(false);
      onResult(PRIZES[prizeIndex]);
    }, 4200);
  }, [spinning, hasSpun, onResult, onTick, stopTicks]);

  // Build segment paths
  const segments = PRIZES.map((prize, i) => {
    const startAngle = i * segmentAngle - 90; // -90 so first segment starts at top
    const endAngle = startAngle + segmentAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = R + (R - STROKE) * Math.cos(startRad);
    const y1 = R + (R - STROKE) * Math.sin(startRad);
    const x2 = R + (R - STROKE) * Math.cos(endRad);
    const y2 = R + (R - STROKE) * Math.sin(endRad);

    const largeArc = segmentAngle > 180 ? 1 : 0;

    const path = `M ${R} ${R} L ${x1} ${y1} A ${R - STROKE} ${R - STROKE} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Label position
    const labelAngle = startAngle + segmentAngle / 2;
    const labelRad = (labelAngle * Math.PI) / 180;
    const labelR = R * 0.62;
    const lx = R + labelR * Math.cos(labelRad);
    const ly = R + labelR * Math.sin(labelRad);

    // Icon position (slightly outward from label)
    const iconR = R * 0.82;
    const ix = R + iconR * Math.cos(labelRad);
    const iy = R + iconR * Math.sin(labelRad);

    return { prize, path, lx, ly, ix, iy, labelAngle };
  });

  return (
    <div className="relative no-select" style={{ width: SIZE, height: SIZE + 30 }}>
      {/* Pointer */}
      <div
        className={`absolute left-1/2 top-0 z-20 -translate-x-1/2 ${spinning ? 'pointer-bounce' : ''}`}
        style={{ transformOrigin: '50% 20%' }}
      >
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
          <path
            d="M18 42 L4 8 Q4 2 10 2 L26 2 Q32 2 32 8 Z"
            fill="#d4a017"
            stroke="#7c1d3d"
            strokeWidth="2"
          />
          <path
            d="M18 38 L8 10 Q8 6 12 6 L24 6 Q28 6 28 10 Z"
            fill="#f7e08a"
          />
          <circle cx="18" cy="12" r="3" fill="#7c1d3d" />
        </svg>
      </div>

      {/* Wheel */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute top-5 left-0"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? 'transform 4.2s cubic-bezier(0.17, 0.67, 0.16, 1)'
            : 'none',
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
        }}
      >
        {/* Outer gold ring */}
        <circle cx={R} cy={R} r={R - 1} fill="none" stroke="#d4a017" strokeWidth="6" />
        <circle cx={R} cy={R} r={R - 5} fill="none" stroke="#9c7016" strokeWidth="2" />

        {/* Segments */}
        {segments.map(({ prize, path, lx, ly, ix, iy, labelAngle }) => (
          <g key={prize.id}>
            <path d={path} fill={prize.color} stroke="#9c7016" strokeWidth="1" />
            {/* Decorative inner arc */}
            <path
              d={path}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            {/* Label */}
            <text
              x={lx}
              y={ly}
              fill={prize.textColor}
              fontSize="11"
              fontFamily="Poppins, sans-serif"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${labelAngle} ${lx} ${ly})`}
            >
              {prize.shortLabel}
            </text>
            {/* Icon */}
            <text
              x={ix}
              y={iy}
              fontSize="18"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${labelAngle} ${ix} ${iy})`}
            >
              {prize.icon}
            </text>
          </g>
        ))}

        {/* Decorative dots on the gold ring */}
        {PRIZES.map((_, i) => {
          const angle = (i * segmentAngle - 90) * (Math.PI / 180);
          const dotR = R - 3;
          return (
            <circle
              key={`dot-${i}`}
              cx={R + dotR * Math.cos(angle)}
              cy={R + dotR * Math.sin(angle)}
              r="2"
              fill="#7c1d3d"
            />
          );
        })}

        {/* Center hub */}
        <circle cx={R} cy={R} r="22" fill="#7c1d3d" stroke="#d4a017" strokeWidth="3" />
        <circle cx={R} cy={R} r="16" fill="#9c2747" stroke="#f7e08a" strokeWidth="1" />
        <text
          x={R}
          y={R - 2}
          fill="#f7e08a"
          fontSize="8"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          SPIN
        </text>
        <text
          x={R}
          y={R + 7}
          fill="#f7e08a"
          fontSize="8"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          & WIN
        </text>
      </svg>

      {/* Spin button below wheel */}
      <button
        onClick={spin}
        disabled={spinning || hasSpun}
        className={`absolute left-1/2 -translate-x-1/2 ${
          spinning || hasSpun
            ? 'opacity-40 cursor-not-allowed'
            : 'pulse-glow active:scale-95'
        } bg-gradient-to-b from-gold-400 to-gold-500 text-kc-900 font-bold py-3 px-10 rounded-full text-base font-display shadow-lg transition-all`}
        style={{ top: SIZE + 20 }}
      >
        {spinning ? 'Spinning...' : hasSpun ? 'Please Reset' : 'SPIN'}
      </button>
    </div>
  );
}
