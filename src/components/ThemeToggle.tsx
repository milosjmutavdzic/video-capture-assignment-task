import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

interface Props {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      className="btn-icon"
      onClick={onToggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <MoonIcon className="theme-icon" />
      ) : (
        <SunIcon className="theme-icon" />
      )}
    </button>
  );
}

export default ThemeToggle;
