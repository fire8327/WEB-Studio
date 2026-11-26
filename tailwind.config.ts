import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--rgb-bg-canvas) / <alpha-value>)',
        'canvas-alt': 'rgb(var(--rgb-bg-canvas-alt) / <alpha-value>)',
        surface: 'rgb(var(--rgb-bg-surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--rgb-bg-surface-elevated) / <alpha-value>)',
        'surface-hover': 'rgb(var(--rgb-bg-surface-hover) / <alpha-value>)',
        'light-band': 'var(--color-bg-light-band)',
        'light-card': 'var(--color-bg-light-card)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        'inverse-primary': 'var(--color-text-inverse-primary)',
        'inverse-secondary': 'var(--color-text-inverse-secondary)',
        emerald: {
          DEFAULT: 'rgb(var(--rgb-brand-emerald) / <alpha-value>)',
          hover: 'rgb(var(--rgb-brand-emerald-hover) / <alpha-value>)',
          active: 'rgb(var(--rgb-brand-emerald-active) / <alpha-value>)',
          tint: 'var(--color-brand-emerald-tint)'
        },
        indigo: {
          DEFAULT: 'rgb(var(--rgb-brand-indigo) / <alpha-value>)',
          hover: 'rgb(var(--rgb-brand-indigo-hover) / <alpha-value>)',
          tint: 'var(--color-brand-indigo-tint)'
        },
        cyan: {
          DEFAULT: 'rgb(var(--rgb-brand-cyan) / <alpha-value>)',
          tint: 'var(--color-brand-cyan-tint)'
        },
        telegram: 'rgb(var(--rgb-brand-telegram) / <alpha-value>)',
        vk: 'rgb(var(--rgb-brand-vk) / <alpha-value>)',
        nda: 'rgb(var(--rgb-semantic-nda) / <alpha-value>)',
        danger: 'rgb(var(--rgb-semantic-error) / <alpha-value>)'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)']
      },
      spacing: {
        22: '5.5rem'
      },
      opacity: {
        12: '0.12',
        14: '0.14',
        18: '0.18',
        92: '0.92',
        98: '0.98'
      },
      maxWidth: {
        container: 'var(--container-max-width)',
        narrow: 'var(--container-narrow-width)'
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        elevated: 'var(--shadow-elevated)',
        glass: 'var(--shadow-glass)',
        'glow-emerald': 'var(--shadow-glow-emerald)',
        'glow-indigo': 'var(--shadow-glow-indigo)'
      }
    }
  },
  plugins: []
}
