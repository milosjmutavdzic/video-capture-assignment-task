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

  it('shows an error when access is denied', async () => {
    mockGetUserMedia(() => Promise.reject(new Error('denied')));

    const { result } = renderHook(() => useCameraCapture());

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.phase).toBe('error');
    expect(result.current.error).toMatch(/camera/i);
  });
});
