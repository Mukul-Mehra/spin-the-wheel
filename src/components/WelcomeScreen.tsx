import { Diya } from '@/components/Diya';
import { Mandala } from '@/components/Mandala';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="screen-enter relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-kc-900 via-kc-800 to-kc-700 px-6 py-10">
      {/* Background mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mandala-spin text-gold-300" style={{ width: '120vmin', height: '120vmin' }}>
          <Mandala className="w-full h-full" opacity={0.06} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mandala-spin-reverse text-gold-300" style={{ width: '80vmin', height: '80vmin' }}>
          <Mandala className="w-full h-full" opacity={0.05} />
        </div>
      </div>

      {/* Top diya row */}
      <div className="fade-in-down relative z-10 flex gap-4">
        <Diya size={32} />
        <Diya size={40} />
        <Diya size={32} />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center stagger flex flex-col items-center gap-5">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-400/10">
          <span className="text-gold-300 text-xs font-semibold tracking-widest uppercase">
            Karva Chauth Special
          </span>
        </div>

        <h1 className="font-display text-5xl leading-tight font-black">
          <span className="shimmer-gold">Naturals</span>
          <br />
          <span className="text-gold-200 text-3xl font-medium tracking-wide">Makeover Parlor</span>
        </h1>

        <p className="text-kc-200 text-sm italic font-light">
          by Anu
        </p>

        <div className="my-2 h-px w-48 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

        <p className="text-kc-100 text-base leading-relaxed max-w-xs">
          Spin the wheel of fortune and win exciting beauty services this festive season!
        </p>

        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {['Facial', 'Haircut', 'Clean Up', 'D-Tan', '& more'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gold-400/15 text-gold-200 border border-gold-400/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 flex flex-col items-center gap-3 fade-in-up w-full max-w-xs">
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-kc-900 font-bold text-lg py-4 rounded-2xl font-display shadow-2xl active:scale-95 transition-all pulse-glow"
        >
          Try Your Luck
        </button>
        <p className="text-kc-300 text-xs">
          One spin per customer
        </p>
      </div>
    </div>
  );
}
