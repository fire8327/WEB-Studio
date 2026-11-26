<script setup lang="ts">
import { Lock, ShieldCheck } from 'lucide-vue-next'

defineProps<{
  isNda: boolean
  route: string
  accent: 'emerald' | 'indigo' | 'cyan'
  highlights: string[]
}>()
</script>

<template>
  <div class="relative h-44 w-full overflow-hidden rounded-t-lg border-b border-white/10 bg-[#0B0E16] p-4 flex flex-col justify-between select-none">
    <!-- Vector Architectural Blueprint Grid -->
    <svg
      class="absolute inset-0 h-full w-full opacity-35 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="blueprint-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            stroke-width="0.75"
          />
        </pattern>
        <pattern
          id="nda-hatch"
          width="12"
          height="12"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="12"
            stroke="rgba(244,63,94,0.12)"
            stroke-width="1.5"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#blueprint-grid)"
      />
      <rect
        v-if="isNda"
        width="100%"
        height="100%"
        fill="url(#nda-hatch)"
      />
    </svg>

    <!-- Accent ambient spot -->
    <div
      class="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl pointer-events-none"
      :class="{
        'bg-emerald/15': accent === 'emerald',
        'bg-indigo/20': accent === 'indigo',
        'bg-cyan/15': accent === 'cyan'
      }"
    />

    <!-- Top browser bar -->
    <div class="relative z-10 flex items-center justify-between gap-2">
      <div class="flex items-center gap-1.5 min-w-0">
        <span class="h-2 w-2 rounded-full bg-white/25 shrink-0" />
        <span class="h-2 w-2 rounded-full bg-white/15 shrink-0" />
        <span class="ml-1 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-secondary border border-white/10">
          {{ route }}
        </span>
      </div>

      <span
        v-if="isNda"
        class="inline-flex items-center gap-1 rounded-full bg-[#F43F5E]/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#F43F5E] border border-[#F43F5E]/35 shrink-0"
      >
        <Lock class="h-2.5 w-2.5" :stroke-width="2" />
        NDA PROTECTED
      </span>
      <span
        v-else
        class="inline-flex items-center gap-1 rounded-full bg-emerald/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-emerald border border-emerald/35 shrink-0"
      >
        <ShieldCheck class="h-2.5 w-2.5" :stroke-width="2" />
        PUBLIC CASE
      </span>
    </div>

    <!-- Wireframe schematic / NDA redacted blocks -->
    <div class="relative z-10 grid grid-cols-3 gap-2 my-auto py-2">
      <div
        v-for="tag in highlights"
        :key="tag"
        class="rounded-md border px-2 py-2 text-center font-mono text-[10px] leading-tight backdrop-blur-sm"
        :class="
          isNda
            ? 'border-white/10 bg-white/[0.03] text-primary/90'
            : 'border-white/12 bg-surface/80 text-primary'
        "
      >
        {{ tag }}
      </div>
    </div>

    <!-- Bottom schematic bar -->
    <div class="relative z-10 flex items-center justify-between font-mono text-[10px] text-muted">
      <span>{{ isNda ? 'WHITE LABEL · CLIENT REDACTED' : 'OPEN ARCHITECTURE PREVIEW' }}</span>
      <span class="text-emerald">SSR / 95+ CWV</span>
    </div>
  </div>
</template>
