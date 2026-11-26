<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUpRight, Calculator, Mail, Menu, X } from 'lucide-vue-next'
import BrandLogo from '~/components/icons/BrandLogo.vue'
import TelegramIcon from '~/components/icons/TelegramIcon.vue'
import VkIcon from '~/components/icons/VkIcon.vue'
import { siteConfig } from '~/config/site'
import { mainNavigation } from '~/data/studio'

const route = useRoute()
const isScrolled = ref(false)
const showMobileQuickBar = ref(false)
const isDrawerOpen = ref(false)
const activeSectionId = ref<string>('models')

let sectionObserver: IntersectionObserver | null = null

function handleScroll() {
  if (!import.meta.client) return
  const y = window.scrollY
  isScrolled.value = y > 24
  showMobileQuickBar.value = y > 520
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isDrawerOpen.value) {
    isDrawerOpen.value = false
  }
}

function closeDrawer() {
  isDrawerOpen.value = false
}

onMounted(() => {
  if (!import.meta.client) return
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)

  if ('IntersectionObserver' in window) {
    const sectionIds = mainNavigation.map(item => item.sectionId).filter(Boolean) as string[]
    sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSectionId.value = entry.target.id
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    }
  }
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  sectionObserver?.disconnect()
})

function isNavActive(sectionId?: string): boolean {
  if (route.path !== '/') return false
  return Boolean(sectionId && activeSectionId.value === sectionId)
}
</script>

<template>
  <header
    class="sticky top-0 z-[40] transition-[background-color,border-color,backdrop-filter] duration-200"
    :class="
      isScrolled
        ? 'bg-[#0D1017]/90 backdrop-blur-xl border-b border-white/[0.08]'
        : 'bg-canvas/70 backdrop-blur-md border-b border-transparent'
    "
  >
    <div class="mx-auto flex h-16 lg:h-[72px] max-w-container items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <!-- Left: Logo + Live Availability -->
      <div class="flex items-center gap-3 min-w-0">
        <NuxtLink
          to="/"
          class="rounded-md focus-visible:outline-none"
          aria-label="LAYER.DEV — На главную"
        >
          <BrandLogo />
        </NuxtLink>

        <NuxtLink
          to="/#brief"
          class="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald hover:bg-emerald/15 transition-colors shrink-0"
          title="Открытые слоты на старт проектов"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
          </span>
          <span class="hidden sm:inline">{{ siteConfig.availability.badgeText }}</span>
          <span class="sm:hidden">{{ siteConfig.availability.badgeShort }}</span>
        </NuxtLink>
      </div>

      <!-- Center: Desktop Nav -->
      <nav
        aria-label="Основная навигация"
        class="hidden lg:flex items-center gap-1"
      >
        <NuxtLink
          v-for="item in mainNavigation"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="
            isNavActive(item.sectionId)
              ? 'text-emerald bg-emerald/10'
              : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
          "
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Right: Quick Channels & CTAs -->
      <div class="flex items-center gap-2">
        <div class="hidden sm:flex items-center gap-1.5">
          <a
            :href="siteConfig.contacts.telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram (ответ ~15 мин)"
            title="Написать в Telegram · ответ ~15 мин"
            class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-surface text-telegram hover:border-telegram/50 hover:bg-telegram/10 transition-colors"
          >
            <TelegramIcon />
          </a>

          <a
            :href="siteConfig.contacts.vkUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в VK"
            title="Написать во ВКонтакте"
            class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-surface text-vk hover:border-vk/50 hover:bg-vk/10 transition-colors"
          >
            <VkIcon />
          </a>
        </div>

        <NuxtLink
          to="/calculator"
          class="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold btn-ghost"
        >
          <Calculator class="h-4 w-4 text-secondary" :stroke-width="1.75" />
          Калькулятор
        </NuxtLink>

        <NuxtLink
          to="/#brief"
          class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm btn-emerald whitespace-nowrap shrink-0"
        >
          <span>Обсудить проект</span>
          <ArrowUpRight class="h-4 w-4 shrink-0" :stroke-width="2" />
        </NuxtLink>

        <!-- Mobile quick TG + Burger -->
        <a
          :href="siteConfig.contacts.telegramUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Telegram"
          class="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-telegram/35 bg-telegram/10 text-telegram"
        >
          <TelegramIcon />
        </a>

        <button
          type="button"
          class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-surface text-primary hover:bg-surface-hover transition-colors"
          :aria-expanded="isDrawerOpen"
          aria-controls="mobile-nav-drawer"
          aria-label="Открыть меню навигации"
          @click="isDrawerOpen = !isDrawerOpen"
        >
          <X v-if="isDrawerOpen" class="h-5 w-5" :stroke-width="1.75" />
          <Menu v-else class="h-5 w-5" :stroke-width="1.75" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isDrawerOpen"
          id="mobile-nav-drawer"
          class="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[60] bg-canvas/98 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col justify-between overflow-y-auto"
        >
          <div class="space-y-2">
            <p class="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
              Навигация
            </p>
            <NuxtLink
              v-for="item in mainNavigation"
              :key="item.to"
              :to="item.to"
              class="flex min-h-[48px] items-center justify-between rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-base font-semibold text-primary hover:border-emerald/40"
              @click="closeDrawer"
            >
              <span>{{ item.label }}</span>
              <ArrowUpRight class="h-4 w-4 text-muted" :stroke-width="1.75" />
            </NuxtLink>

            <div class="grid grid-cols-2 gap-2 pt-2">
              <NuxtLink
                to="/white-label"
                class="flex min-h-[48px] items-center justify-center rounded-lg border border-white/10 bg-surface-elevated px-3 text-sm font-medium text-secondary hover:text-primary"
                @click="closeDrawer"
              >
                White Label
              </NuxtLink>
              <NuxtLink
                to="/outstaffing-vue"
                class="flex min-h-[48px] items-center justify-center rounded-lg border border-white/10 bg-surface-elevated px-3 text-sm font-medium text-secondary hover:text-primary"
                @click="closeDrawer"
              >
                Аутстафф Vue
              </NuxtLink>
            </div>
          </div>

          <div class="space-y-3 pt-6 border-t border-white/10">
            <NuxtLink
              to="/#calculator"
              class="flex min-h-[48px] w-full items-center justify-center gap-2 text-sm btn-emerald"
              @click="closeDrawer"
            >
              <Calculator class="h-4 w-4" :stroke-width="2" />
              Открыть калькулятор
            </NuxtLink>

            <div class="grid grid-cols-3 gap-2">
              <a
                :href="siteConfig.contacts.telegramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg border border-telegram/40 bg-telegram/10 text-xs font-semibold text-primary"
              >
                <TelegramIcon class="text-telegram" />
                Telegram
              </a>
              <a
                :href="siteConfig.contacts.vkUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg border border-vk/40 bg-vk/10 text-xs font-semibold text-primary"
              >
                <VkIcon class="text-vk" />
                VK
              </a>
              <a
                :href="`mailto:${siteConfig.contacts.email}`"
                class="flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg border border-white/12 bg-surface text-xs font-semibold text-primary"
              >
                <Mail class="h-4 w-4 text-emerald" :stroke-width="1.75" />
                Email
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Mobile Floating Bottom Quick-Action Bar (teleported out of backdrop-blur header) -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="showMobileQuickBar && !isDrawerOpen"
          class="lg:hidden fixed bottom-3 inset-x-3 z-[45] grid grid-cols-2 gap-2 rounded-xl border border-white/12 bg-[#0D1017]/92 p-2 shadow-elevated backdrop-blur-xl"
        >
          <NuxtLink
            to="/#calculator"
            class="flex h-11 items-center justify-center gap-1.5 rounded-lg text-xs font-bold btn-emerald"
          >
            <Calculator class="h-4 w-4" :stroke-width="2" />
            Рассчитать
          </NuxtLink>
          <a
            :href="siteConfig.contacts.telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-telegram/40 bg-telegram/15 text-xs font-bold text-primary"
          >
            <TelegramIcon class="text-telegram" />
            Написать в TG
          </a>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
