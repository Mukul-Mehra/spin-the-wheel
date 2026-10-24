import { useEffect } from 'react';
import { type Prize, getRandomGreeting } from '@/data/prizes';
import { Confetti } from '@/components/Confetti';
import { Diya } from '@/components/Diya';
import { Mandala } from '@/components/Mandala';

interface ResultModalProps {
  prize: Prize;
  onReset: () => void;
  onPlayWin: () => void;
}

export function ResultModal({ prize, onReset, onPlayWin }: ResultModalProps) {
  const greeting = getRandomGreeting();

  useEffect(() => {
    onPlayWin();
  }, [onPlayWin]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 bg-kc-900/80 backdrop-blur-md fade-in">
      <Confetti count={50} />

      {/* Background mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mandala-spin text-gold-300" style={{ width: '100vmin', height: '100vmin' }}>
          <Mandala className="w-full h-full" opacity={0.05} />
        </div>
      </div>

      <div className="result-pop relative w-full max-w-sm">
        {/* Card */}
        <div className="relative bg-gradient-to-b from-kc-800 to-kc-900 rounded-3xl border-2 border-gold-400/30 shadow-2xl overflow-hidden">
          {/* Top decoration */}
          <div className="flex justify-center gap-3 pt-6">
            <Diya size={28} />
            <Diya size={36} />
            <Diya size={28} />
          </div>

          {/* Greeting */}
          <div className="text-center px-6 pt-4">
            <p className="text-gold-300 text-sm font-light">{greeting}</p>
          </div>

          {/* Prize display */}
          <div className="text-center px-6 py-8">
            <div className="text-6xl mb-3">{prize.icon}</div>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-4" />
            <h2 className="font-display text-3xl font-bold shimmer-gold leading-tight">
              {prize.label}
            </h2>
            <p className="text-kc-200 text-sm mt-3 italic">
              Show this screen to our staff to claim your prize
            </p>
          </div>

          {/* Decorative bottom border */}
          <div className="h-2 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />

          {/* Action */}
          <div className="p-6">
            <button
              onClick={onReset}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-kc-900 font-bold text-base py-3.5 rounded-2xl font-display shadow-lg active:scale-95 transition-all"
            >
              Done — Reset for Next Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
