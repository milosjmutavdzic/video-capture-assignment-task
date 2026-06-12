import Instructions from './components/Instructions';
import VideoPreview from './components/VideoPreview';
import Snapshot from './components/Snapshot';
import useCameraCapture from './hooks/useCameraCapture';

function App() {
  const { phase, videoEl, photo, error, secondsLeft, start } = useCameraCapture();

  const isRunning = phase === 'starting' || phase === 'live';
  const buttonLabel = phase === 'done' ? 'Take another photo' : 'Start';

  return (
    <main className="app">
      <Instructions onStart={start} disabled={isRunning} buttonLabel={buttonLabel} />
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
