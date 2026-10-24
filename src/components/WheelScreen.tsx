import { useCallback, useState } from 'react';
import { SpinWheel } from '@/components/SpinWheel';
import { ResultModal } from '@/components/ResultModal';
import { FloatingPetals } from '@/components/FloatingPetals';
import { Mandala } from '@/components/Mandala';
import { type Prize } from '@/data/prizes';
import { Volume2, VolumeX, RotateCcw, Phone } from 'lucide-react';

interface WheelScreenProps {
  muted: boolean;
  onToggleMute: () => void;
  onTick: () => void;
  onWin: () => void;
  onBack: () => void;
}

export function WheelScreen({
  muted,
  onToggleMute,
  onTick,
  onWin,
  onBack,
}: WheelScreenProps) {
  const [result, setResult] = useState<Prize | null>(null);
  const [resetToken, setResetToken] = useState(0);

  const handleResult = useCallback(
    (prize: Prize) => {
      setResult(prize);
      onWin();
    },
    [onWin],
  );

  const handleReset = useCallback(() => {
    setResult(null);
    setResetToken((t) => t + 1);
  }, []);

  return (
    <div className="screen-enter relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-kc-900 via-kc-800 to-kc-700">
      <FloatingPetals count={12} />

      {/* Background mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mandala-spin text-gold-300" style={{ width: '100vmin', height: '100vmin' }}>
          <Mandala className="w-full h-full" opacity={0.04} />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-5 fade-in-down">
        <div>
          <h1 className="font-display text-xl font-bold shimmer-gold leading-tight">
            Naturals Makeover
          </h1>
          <p className="text-kc-300 text-xs">by Anu</p>
        </div>
        <button
          onClick={onToggleMute}
          className="w-10 h-10 rounded-full bg-kc-700/80 border border-gold-400/30 flex items-center justify-center active:scale-90 transition-transform"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <VolumeX className="text-gold-300" size={20} />
          ) : (
            <Volume2 className="text-gold-300" size={20} />
          )}
        </button>
      </header>

      {/* Wheel area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-2 px-4 fade-in-up">
        <div className="text-center mb-1">
          <p className="text-gold-300 text-xs font-medium tracking-widest uppercase">
            Spin to Win
          </p>
        </div>

        <SpinWheel onResult={handleResult} onTick={onTick} resetToken={resetToken} />
      </main>

      {/* Footer controls */}
      <footer className="relative z-10 px-5 pb-6 pt-2 fade-in-up">
        <div className="flex items-center justify-between gap-3">
          {/* Phone */}
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kc-700/80 border border-gold-400/20 active:scale-95 transition-transform"
          >
            <Phone className="text-gold-300" size={16} />
            <span className="text-gold-200 text-xs font-medium">
              Call to Book
            </span>
          </a>

          {/* Reset button — staff controlled */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kc-700/80 border border-gold-400/20 active:scale-95 transition-transform"
          >
            <RotateCcw className="text-gold-300" size={16} />
            <span className="text-gold-200 text-xs font-medium">
              Reset (Staff)
            </span>
          </button>

          {/* Back to home */}
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl bg-kc-700/80 border border-gold-400/20 active:scale-95 transition-transform"
          >
            <span className="text-gold-200 text-xs font-medium">Home</span>
          </button>
        </div>
      </footer>

      {/* Result modal overlay */}
      {result && (
        <ResultModal prize={result} onReset={handleReset} onPlayWin={onWin} />
      )}
    </div>
  );
}
