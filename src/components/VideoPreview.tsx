import { useEffect } from 'react';

interface Props {
  videoEl: React.RefObject<HTMLVideoElement | null>;
  phase: 'idle' | 'starting' | 'live' | 'done' | 'error';
  secondsLeft: number;
  error: string | null;
}

function VideoPreview({ videoEl, phase, secondsLeft, error }: Props) {
  useEffect(() => {
    if (videoEl.current && phase === 'live') {
      videoEl.current.play().catch(() => {});
    }
  }, [phase, videoEl]);

  if (phase === 'idle' || phase === 'done') return null;

  if (phase === 'error') {
    return (
      <div className="card video-area">
        <p className="error-msg">{error}</p>
      </div>
    );
  }

  return (
    <div className="card video-area">
      <div className="video-wrapper">
        <video
          ref={videoEl}
          className="video-feed"
          autoPlay
          playsInline
          muted
        />
        {phase === 'live' && (
          <div className="countdown-badge">{secondsLeft}</div>
        )}
        {phase === 'starting' && (
          <div className="video-overlay">Requesting camera access...</div>
        )}
      </div>
    </div>
  );
}

export default VideoPreview;
