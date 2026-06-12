import InfoIcon from '../icons/InfoIcon';
import ThemeToggle from './ThemeToggle';

const CAPTURE_DELAY = 5;

interface Props {
  onStart: () => void;
  isRunning: boolean;
  secondsLeft: number;
  photoUrl: string | null;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

function Instructions({ onStart, isRunning, secondsLeft, photoUrl, theme, onThemeToggle }: Props) {
  const progress = ((CAPTURE_DELAY - secondsLeft) / CAPTURE_DELAY) * 100;

  return (
    <section className="instructions card">
      <header className="instructions__header">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <h1 className="instructions__title">Video capture</h1>
        <span />
      </header>
      <div className="instructions__body">
        <div className="instructions__info">
          <InfoIcon className="instructions__info-icon" />
          <p className="instructions__description">
            Click the button to allow camera access. A photo will be taken
            automatically after a few seconds.
          </p>
        </div>
      </div>
      <footer className="instructions__footer">
        {isRunning ? (
          <div className="instructions__progress">
            <div
              className="instructions__progress-bar"
              style={{ width: `${progress}%` }}
            />
            <span className="instructions__progress-label">
              Taking photo in {secondsLeft}s
            </span>
          </div>
        ) : (
          <>
            <button className="btn-primary" onClick={onStart}>
              {photoUrl ? 'Retake' : 'Start'}
            </button>
            {photoUrl && (
              <a href={photoUrl} download="snapshot.png" className="btn-secondary">
                Download
              </a>
            )}
          </>
        )}
      </footer>
    </section>
  );
}

export default Instructions;
