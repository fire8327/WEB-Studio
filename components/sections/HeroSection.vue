<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDownRight, ArrowUpRight, ChevronDown, Sparkles } from 'lucide-vue-next'
import TelegramIcon from '~/components/icons/TelegramIcon.vue'
import VkIcon from '~/components/icons/VkIcon.vue'
import HeroPreviewWidget from '~/components/widgets/HeroPreviewWidget.vue'
import { siteConfig } from '~/config/site'
import { heroScenarios } from '~/data/studio'
import type { HeroScenarioKey } from '~/types'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    initialScenario?: HeroScenarioKey
    primaryCtaText?: string
    primaryCtaTo?: string
  }>(),
  {
    eyebrow: 'WEB DEVELOPMENT & DESIGN STUDIO',
    title: 'Создаём сайты и цифровые продукты,',
    initialScenario: 'white-label',
    primaryCtaText: 'Обсудить проект',
    primaryCtaTo: '#brief'
  }
)

const activeKey = ref<HeroScenarioKey>(props.initialScenario)
const mobilePreviewOpen = ref(true)

const activeScenario = computed(() => {
  return heroScenarios.find(s => s.key === activeKey.value) ?? heroScenarios[0]!
})
</script>

<template>
  <section
    id="hero"
    class="relative overflow-hidden bg-canvas pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
  >
    <!-- Parallax Ambient Orbs -->
    <div
      data-parallax="0.18"
      class="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-emerald/14 blur-[110px] animate-float-slow"
      aria-hidden="true"
    />
    <div
      data-parallax="-0.14"
      class="pointer-events-none absolute top-20 -right-24 h-[460px] w-[460px] rounded-full bg-indigo/18 blur-[120px] animate-float-reverse"
      aria-hidden="true"
    />

    <!-- Subtle Architectural Grid -->
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      style="mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 100%);"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-grid-64" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid-64)" />
    </svg>

    <div class="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 items-center">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Studio Eyebrow Badge -->
          <div class="studio-eyebrow">
            <Sparkles class="h-3.5 w-3.5" :stroke-width="2" />
            <span>{{ eyebrow }}</span>
          </div>

          <!-- 3-Direction Segmented Control -->
          <div
            role="tablist"
            aria-label="Направление студии"
            class="inline-flex max-w-full flex-wrap sm:flex-nowrap rounded-xl border border-white/10 bg-surface/90 p-1 gap-1 backdrop-blur-md"
          >
            <button
              v-for="item in heroScenarios"
              :key="item.key"
              type="button"
              role="tab"
              :aria-selected="activeKey === item.key"
              class="rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              :class="
                activeKey === item.key
                  ? 'bg-emerald/15 text-emerald border border-emerald/40 shadow-sm'
                  : 'text-secondary hover:text-primary border border-transparent'
              "
              @click="activeKey = item.key"
            >
              {{ item.tabLabel }}
            </button>
          </div>

          <!-- Kinetic Display H1 -->
          <h1 class="font-display text-[1.95rem] sm:text-[2.75rem] lg:text-[3.35rem] font-bold leading-[1.08] tracking-[-0.03em] text-primary">
            {{ title }}
            <span
              class="block mt-1.5 bg-clip-text text-transparent"
              style="background-image: var(--gradient-text-accent)"
            >
              {{ activeScenario.headlineAccent }}
            </span>
          </h1>

          <!-- Dynamic Subtitle -->
          <p class="max-w-[58ch] text-base sm:text-lg leading-relaxed text-secondary min-h-[4.75rem] sm:min-h-[3.5rem]">
            {{ activeScenario.subtitle }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-1">
            <NuxtLink
              :to="primaryCtaTo"
              class="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base btn-emerald"
            >
              <span>{{ primaryCtaText }}</span>
              <ArrowUpRight class="h-4 w-4 shrink-0" :stroke-width="2.2" />
            </NuxtLink>

            <NuxtLink
              to="#cases"
              class="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold btn-ghost hover:border-emerald/45"
            >
              <span>Смотреть работы</span>
              <ArrowDownRight class="h-4 w-4 text-emerald shrink-0" :stroke-width="2" />
            </NuxtLink>

            <a
              :href="siteConfig.contacts.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              title="Написать в Telegram · ответ ~15 мин"
              class="inline-flex h-[48px] w-[48px] items-center justify-center rounded-md border border-white/[0.14] bg-surface text-telegram hover:border-telegram/50 hover:bg-telegram/10 transition-colors"
            >
              <TelegramIcon />
            </a>

            <a
              :href="siteConfig.contacts.vkUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать во ВКонтакте"
              title="Написать во ВКонтакте"
              class="inline-flex h-[48px] w-[48px] items-center justify-center rounded-md border border-white/[0.14] bg-surface text-vk hover:border-vk/50 hover:bg-vk/10 transition-colors"
            >
              <VkIcon />
            </a>
          </div>

          <!-- Studio Proof Strip -->
          <div class="grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
            <div>
              <div class="font-display text-xl sm:text-3xl font-bold text-primary tabular-nums">
                60<span class="text-emerald">+</span>
              </div>
              <div class="mt-1 text-xs sm:text-sm text-secondary">
                Запущенных проектов
              </div>
            </div>
            <div>
              <div class="font-display text-xl sm:text-3xl font-bold text-primary tabular-nums">
                7<span class="text-emerald">+</span> <span class="text-base font-semibold text-secondary">лет</span>
              </div>
              <div class="mt-1 text-xs sm:text-sm text-secondary">
                Опыта в веб-дизайне
              </div>
            </div>
            <div>
              <div class="font-display text-xl sm:text-3xl font-bold text-primary tabular-nums">
                14 <span class="text-base font-semibold text-secondary">дн.</span>
              </div>
              <div class="mt-1 text-xs sm:text-sm text-secondary">
                Средний срок запуска
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: 3D Parallax Showreel Stage -->
        <div class="hidden sm:block">
          <HeroPreviewWidget
            :scenario="activeScenario"
            @select-scenario="activeKey = $event"
          />
        </div>

        <!-- Mobile Showreel Toggle -->
        <div class="sm:hidden space-y-3">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-xl border border-white/12 bg-surface-elevated px-4 py-3 text-left"
            :aria-expanded="mobilePreviewOpen"
            @click="mobilePreviewOpen = !mobilePreviewOpen"
          >
            <div class="flex items-center gap-2.5">
              <span class="h-2 w-2 rounded-full bg-emerald" />
              <span class="text-xs font-bold text-primary">
                Шоурил студии · {{ activeScenario.showcaseTitle }}
              </span>
            </div>
            <ChevronDown
              class="h-4 w-4 text-secondary transition-transform duration-200"
              :class="{ 'rotate-180': mobilePreviewOpen }"
              :stroke-width="2"
            />
          </button>

          <div v-if="mobilePreviewOpen">
            <HeroPreviewWidget
              :scenario="activeScenario"
              @select-scenario="activeKey = $event"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
