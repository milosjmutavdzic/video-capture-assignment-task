import { useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'starting' | 'live' | 'done' | 'error'

const CAPTURE_DELAY = 5

function useCameraCapture() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [photo, setPhoto] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(CAPTURE_DELAY)

  const videoEl = useRef<HTMLVideoElement | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const countdownId = useRef<ReturnType<typeof setInterval> | null>(null)

  function stopCamera() {
    stream.current?.getTracks().forEach((track) => track.stop())
    stream.current = null
  }

  function stopCountdown() {
    if (countdownId.current) {
      clearInterval(countdownId.current)
      countdownId.current = null
    }
  }

  function takePhoto() {
    const video = videoEl.current
    if (!video) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)

    setPhoto(canvas.toDataURL('image/png'))
    stopCamera()
    setPhase('done')
  }

  async function start() {
    stopCountdown()
    stopCamera()

    setError(null)
    setPhoto(null)
    setSecondsLeft(CAPTURE_DELAY)
    setPhase('starting')

    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })

      stream.current = media
      if (videoEl.current) {
        videoEl.current.srcObject = media
      }
      setPhase('live')

      let remaining = CAPTURE_DELAY
      countdownId.current = setInterval(() => {
        remaining -= 1
        setSecondsLeft(remaining)
        if (remaining <= 0) {
          stopCountdown()
          takePhoto()
        }
      }, 1000)
    } catch {
      setError('We could not access your camera. Please allow access and try again.')
      setPhase('error')
    }
  }

  useEffect(() => {
    return () => {
      if (countdownId.current) clearInterval(countdownId.current)
      stream.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return { phase, videoEl, photo, error, secondsLeft, start }
}

export default useCameraCapture
