<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Play, Sparkles } from 'lucide-vue-next'
import { heroScenarios } from '~/data/studio'
import type { HeroScenario } from '~/types'

defineProps<{
  scenario: HeroScenario
}>()

const emit = defineEmits<{
  selectScenario: [key: HeroScenario['key']]
}>()

const stageRef = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)
const glareX = ref(50)
const glareY = ref(50)

function handlePointerMove(e: PointerEvent) {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  tiltY.value = (px - 0.5) * 10
  tiltX.value = (0.5 - py) * 8
  glareX.value = px * 100
  glareY.value = py * 100
}

function resetTilt() {
  tiltX.value = 0
  tiltY.value = 0
  glareX.value = 50
  glareY.value = 50
}

const stageStyle = computed(() => ({
  transform: `perspective(1200px) rotateX(${tiltX.value.toFixed(2)}deg) rotateY(${tiltY.value.toFixed(2)}deg)`,
  transition: tiltX.value === 0 && tiltY.value === 0 ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 90ms ease-out'
}))
</script>

<template>
  <div
    ref="stageRef"
    class="relative select-none"
    @pointermove="handlePointerMove"
    @pointerleave="resetTilt"
  >
    <!-- Parallax Back Glow Layers -->
    <div
      data-parallax="0.16"
      class="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-65 blur-3xl"
      style="background: radial-gradient(circle at 30% 20%, rgba(229,199,155,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 55%)"
      aria-hidden="true"
    />

    <!-- Main 3D Tilt Showreel Card -->
    <div
      :style="stageStyle"
      class="relative rounded-2xl border border-white/15 bg-surface-elevated/95 shadow-elevated overflow-hidden backdrop-blur-xl"
    >
      <!-- Specular mouse glare -->
      <div
        class="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        :style="{
          background: `radial-gradient(500px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08), transparent 45%)`
        }"
        aria-hidden="true"
      />

      <!-- Top Studio Frame Bar -->
      <div class="relative z-10 flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#10141E]/90 px-4 py-3">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald/15 text-emerald shrink-0">
            <Play class="h-3 w-3 fill-current" />
          </span>
          <div class="min-w-0">
            <div class="truncate text-xs font-bold text-primary">
              {{ scenario.showcaseTitle }}
            </div>
            <div class="truncate text-[11px] text-secondary">
              {{ scenario.showcaseNiche }}
            </div>
          </div>
        </div>

        <span class="inline-flex items-center gap-1.5 rounded-full border border-emerald/35 bg-emerald/12 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald shrink-0">
          <Sparkles class="h-3 w-3" :stroke-width="2" />
          {{ scenario.modeBadge }}
        </span>
      </div>

      <!-- High-Craft Case Visual Showcase (stacked cross-fade without blank frame) -->
      <NuxtLink
        :to="`/cases/${scenario.showcaseCaseSlug}`"
        class="group relative block aspect-[16/10] w-full overflow-hidden bg-[#090B10]"
      >
        <img
          v-for="item in heroScenarios"
          :key="item.key"
          :src="item.showcaseImage"
          :alt="item.showcaseTitle"
          class="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
          :class="
            item.key === scenario.key
              ? 'opacity-100 scale-100 z-[1]'
              : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
          "
        >

        <!-- Bottom Gradient Scrim + Floating Highlights -->
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B10]/90 via-[#090B10]/15 to-transparent" />

        <div class="absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-end justify-between gap-2">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="pill in scenario.highlights"
              :key="pill"
              class="rounded-full border border-white/15 bg-[#090B10]/75 px-2.5 py-1 text-[11px] font-semibold text-primary backdrop-blur-md"
            >
              {{ pill }}
            </span>
          </div>

          <span class="inline-flex items-center gap-1 rounded-full bg-emerald px-3 py-1 text-[11px] font-bold text-[#090B10] shadow-glow-emerald transition-transform duration-300 group-hover:translate-x-0.5">
            Открыть кейс
            <ArrowUpRight class="h-3.5 w-3.5" :stroke-width="2.5" />
          </span>
        </div>
      </NuxtLink>

      <!-- Interactive Mini-Reel Switcher -->
      <div class="relative z-10 grid grid-cols-3 gap-2 border-t border-white/[0.08] bg-[#0D1017] p-3">
        <button
          v-for="item in heroScenarios"
          :key="item.key"
          type="button"
          class="group flex items-center gap-2 rounded-lg border p-1.5 text-left transition-all"
          :class="
            item.key === scenario.key
              ? 'border-emerald/55 bg-emerald/10'
              : 'border-white/[0.06] bg-surface hover:border-white/20'
          "
          @click="emit('selectScenario', item.key)"
        >
          <img
            :src="item.showcaseImage"
            :alt="item.showcaseTitle"
            class="h-9 w-12 rounded object-cover shrink-0 border border-white/10"
          >
          <div class="min-w-0">
            <div class="truncate text-[11px] font-bold text-primary">
              {{ item.showcaseTitle }}
            </div>
            <div class="truncate text-[10px] text-muted">
              {{ item.tabLabel }}
            </div>
          </div>
        </button>
      </div>

      <!-- Bottom Status Strip -->
      <div class="relative z-10 border-t border-white/[0.06] bg-[#090B10] px-4 py-2 text-[11px] font-medium text-secondary flex items-center justify-between gap-2">
        <span class="truncate">{{ scenario.footerMetric }}</span>
        <span class="inline-flex items-center gap-1.5 text-emerald font-semibold shrink-0">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
          Live Portfolio
        </span>
      </div>
    </div>

    <!-- Floating Parallax Metric Badge (Top-Left Overlap on Desktop) -->
    <div
      data-parallax="-0.1"
      class="hidden xl:flex absolute -left-8 top-14 z-30 items-center gap-2.5 rounded-xl border border-white/15 bg-[#121216]/92 px-3.5 py-2.5 shadow-elevated backdrop-blur-xl"
    >
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/15 text-emerald font-display text-[11px] font-bold">
        60
      </div>
      <div>
        <div class="text-[11px] font-bold text-primary">Плавность 60 FPS</div>
        <div class="text-[10px] text-secondary">Параллакс и 3D-анимации</div>
      </div>
    </div>
  </div>
</template>
