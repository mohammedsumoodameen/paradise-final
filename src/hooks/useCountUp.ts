import { useEffect, useState } from 'react'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** Animates a number from 0 to `target` with requestAnimationFrame once `start` is true. */
export function useCountUp(target: number, start: boolean, duration = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(Math.round(easeOutCubic(p) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])

  return value
}
