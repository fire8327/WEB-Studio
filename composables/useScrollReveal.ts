import { onMounted, onUnmounted } from 'vue'

/**
 * Observes elements marked with `.reveal-item` inside a container
 * and adds `.is-visible` once they enter the viewport.
 */
export function useScrollReveal(containerSelector = 'main') {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!import.meta.client) return

    const targets = document.querySelectorAll<HTMLElement>(`${containerSelector} .reveal-item`)
    if (targets.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )

    targets.forEach(el => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
