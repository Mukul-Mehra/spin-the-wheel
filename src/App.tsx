import { useCallback, useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { WheelScreen } from '@/components/WheelScreen';
import { FloatingPetals } from '@/components/FloatingPetals';
import { useSoundEffects } from '@/hooks/useSoundEffects';

type Screen = 'welcome' | 'wheel';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const { muted, toggleMute, playTick, playWin } = useSoundEffects();

  const handleStart = useCallback(() => {
    setScreen('wheel');
  }, []);

  const handleBack = useCallback(() => {
    setScreen('welcome');
  }, []);

  const handleWin = useCallback(() => {
    playWin();
  }, [playWin]);

  return (
    <div className="min-h-screen bg-kc-900 text-white font-body">
      {screen === 'welcome' && (
        <>
          <FloatingPetals count={16} />
          <WelcomeScreen onStart={handleStart} />
        </>
      )}

      {screen === 'wheel' && (
        <WheelScreen
          muted={muted}
          onToggleMute={toggleMute}
          onTick={playTick}
          onWin={handleWin}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
