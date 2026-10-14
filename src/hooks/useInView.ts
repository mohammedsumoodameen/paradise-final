import { useEffect, useRef, useState, type RefObject } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * Tracks whether an element is in the viewport using a single
 * IntersectionObserver per element. Defaults to firing once.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  // Browsers without IntersectionObserver simply show everything.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
