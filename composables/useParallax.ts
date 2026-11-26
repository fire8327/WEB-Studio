import { onMounted, onUnmounted } from 'vue'

/**
 * Smooth GPU-accelerated scroll parallax & pointer spotlight coordinates.
 * Elements with `data-parallax="0.12"` shift vertically relative to viewport center.
 * Elements with `.bento-card` receive `--mx` and `--my` coordinates for hover spotlight.
 */
export function useParallax(containerSelector = 'main') {
  let rafId = 0
  let ticking = false
  let pointerHandler: ((e: PointerEvent) => void) | null = null

  function updateParallax() {
    ticking = false
    if (!import.meta.client) return

    const viewportH = window.innerHeight || 900
    const nodes = document.querySelectorAll<HTMLElement>('[data-parallax]')

    for (const el of nodes) {
      const speed = Number(el.dataset.parallax ?? '0')
      if (!Number.isFinite(speed) || speed === 0) continue

      const rect = el.getBoundingClientRect()
      // Only compute when near/within viewport
      if (rect.bottom < -220 || rect.top > viewportH + 220) continue

      const centerOffset = rect.top + rect.height / 2 - viewportH / 2
      const shift = Math.max(-70, Math.min(70, -centerOffset * speed))
      el.style.setProperty('--parallax-y', `${shift.toFixed(1)}px`)
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true
      rafId = window.requestAnimationFrame(updateParallax)
    }
  }

  onMounted(() => {
    if (!import.meta.client) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      updateParallax()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })

      pointerHandler = (e: PointerEvent) => {
        const container = document.querySelector(containerSelector)
        if (!container) return
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('.bento-card')
        if (!target) return
        const rect = target.getBoundingClientRect()
        target.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        target.style.setProperty('--my', `${e.clientY - rect.top}px`)
      }
      window.addEventListener('pointermove', pointerHandler, { passive: true })
    }
  })

  onUnmounted(() => {
    if (!import.meta.client) return
    if (rafId) window.cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (pointerHandler) {
      window.removeEventListener('pointermove', pointerHandler)
    }
  })
}
