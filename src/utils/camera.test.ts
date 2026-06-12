import { afterEach, describe, expect, it, vi } from 'vitest';
import { cameraErrorMessage, captureFrame } from './camera';

describe('cameraErrorMessage', () => {
  it('explains a blocked permission', () => {
    const err = new DOMException('no', 'NotAllowedError');
    expect(cameraErrorMessage(err)).toMatch(/blocked/i);
  });

  it('explains a missing camera', () => {
    const err = new DOMException('no', 'NotFoundError');
    expect(cameraErrorMessage(err)).toMatch(/no camera/i);
  });

  it('explains a camera that is already in use', () => {
    const err = new DOMException('no', 'NotReadableError');
    expect(cameraErrorMessage(err)).toMatch(/in use/i);
  });

  it('falls back to a generic message for anything else', () => {
    expect(cameraErrorMessage(new Error('boom'))).toMatch(/could not access/i);
    expect(cameraErrorMessage(new DOMException('weird', 'AbortError'))).toMatch(
      /could not access/i,
    );
  });
});

describe('captureFrame', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('draws the video onto a canvas sized to the frame and returns its data url', () => {
    const drawImage = vi.fn();
    const fakeCanvas = {
      width: 0,
      height: 0,
      getContext: () => ({ drawImage }),
      toDataURL: () => 'data:image/png;base64,abc',
    } as unknown as HTMLCanvasElement;

    vi.spyOn(document, 'createElement').mockReturnValue(fakeCanvas);

    const video = { videoWidth: 640, videoHeight: 480 } as HTMLVideoElement;
    const url = captureFrame(video);

    expect(fakeCanvas.width).toBe(640);
    expect(fakeCanvas.height).toBe(480);
    expect(drawImage).toHaveBeenCalledWith(video, 0, 0);
    expect(url).toBe('data:image/png;base64,abc');
  });
});
