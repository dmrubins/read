import { useRef, useCallback } from 'react'

export function useAudio() {
  const audioCtxRef = useRef(null)

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  const playTone = useCallback((freq, dur, type = 'sine') => {
    try {
      const ctx = getAudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = type
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
      osc.start()
      osc.stop(ctx.currentTime + dur)
    } catch (_) {}
  }, [getAudioCtx])

  const playCelebration = useCallback(() => {
    const notes = [523, 659, 784, 1047]
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.15), i * 120))
  }, [playTone])

  return { playTone, playCelebration }
}
