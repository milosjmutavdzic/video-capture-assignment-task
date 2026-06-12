type CameraErrorName =
  | 'NotAllowedError'
  | 'SecurityError'
  | 'NotFoundError'
  | 'OverconstrainedError'
  | 'NotReadableError';

const CAMERA_ERROR_MESSAGES: Record<CameraErrorName, string> = {
  NotAllowedError: 'Camera access was blocked. Please allow it in your browser and try again.',
  SecurityError: 'Camera access was blocked. Please allow it in your browser and try again.',
  NotFoundError: 'No camera was found on this device.',
  OverconstrainedError: 'No camera was found on this device.',
  NotReadableError: 'Your camera is already in use by another application.',
};

const GENERIC_CAMERA_ERROR = 'We could not access your camera. Please try again.';

export function cameraErrorMessage(err: unknown) {
  if (err instanceof DOMException && err.name in CAMERA_ERROR_MESSAGES) {
    return CAMERA_ERROR_MESSAGES[err.name as CameraErrorName];
  }
  return GENERIC_CAMERA_ERROR;
}

export function captureFrame(video: HTMLVideoElement) {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d')?.drawImage(video, 0, 0);
  return canvas.toDataURL('image/png');
}
