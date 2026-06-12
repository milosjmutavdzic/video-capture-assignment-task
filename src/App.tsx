import { useEffect, useState } from 'react';
import Instructions from './components/Instructions';
import VideoPreview from './components/VideoPreview';
import Snapshot from './components/Snapshot';
import useCameraCapture from './hooks/useCameraCapture';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { phase, videoEl, photo, error, secondsLeft, start } = useCameraCapture();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }

  const isRunning = phase === 'starting' || phase === 'live';

  return (
    <main className="app">
      <Instructions
        onStart={start}
        isRunning={isRunning}
        secondsLeft={secondsLeft}
        photoUrl={photo}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <VideoPreview
        videoEl={videoEl}
        phase={phase}
        secondsLeft={secondsLeft}
        error={error}
      />
      {photo && <Snapshot url={photo} />}
    </main>
  );
}

export default App;
