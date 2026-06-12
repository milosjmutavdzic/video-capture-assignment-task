import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useCameraCapture from './useCameraCapture';

function fakeStream() {
  const track = { stop: vi.fn() };
  return { getTracks: () => [track] } as unknown as MediaStream;
}

function mockGetUserMedia(impl: () => Promise<MediaStream>) {
  const getUserMedia = vi.fn(impl);
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: { getUserMedia },
  });
  return getUserMedia;
}

describe('useCameraCapture', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('goes live and asks for the front camera when access is granted', async () => {
    const getUserMedia = mockGetUserMedia(() => Promise.resolve(fakeStream()));

    const { result } = renderHook(() => useCameraCapture());

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.phase).toBe('live');
    expect(getUserMedia).toHaveBeenCalledWith({
      video: { facingMode: 'user' },
      audio: false,
    });
  });

  it('shows a blocked message when the user denies access', async () => {
    mockGetUserMedia(() =>
      Promise.reject(new DOMException('denied', 'NotAllowedError')),
    );

    const { result } = renderHook(() => useCameraCapture());

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.phase).toBe('error');
    expect(result.current.error).toMatch(/blocked/i);
  });

  it('shows a not-found message when there is no camera', async () => {
    mockGetUserMedia(() =>
      Promise.reject(new DOMException('missing', 'NotFoundError')),
    );

    const { result } = renderHook(() => useCameraCapture());

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.phase).toBe('error');
    expect(result.current.error).toMatch(/no camera/i);
  });
});
