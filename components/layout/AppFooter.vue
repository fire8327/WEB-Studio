<script setup lang="ts">
import { ArrowUpRight, Mail } from 'lucide-vue-next'
import BrandLogo from '~/components/icons/BrandLogo.vue'
import TelegramIcon from '~/components/icons/TelegramIcon.vue'
import VkIcon from '~/components/icons/VkIcon.vue'
import { siteConfig } from '~/config/site'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/[0.08] bg-[#07090D] pb-24 lg:pb-10 pt-16">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
        <!-- Brand Column -->
        <div class="lg:col-span-4 space-y-4">
          <BrandLogo />
          <p class="text-sm leading-relaxed text-secondary max-w-sm">
            {{ siteConfig.brand.description }}
          </p>
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
            <span class="h-2 w-2 rounded-full bg-emerald" />
            <span>SLA ответ: ~15 мин · {{ siteConfig.availability.badgeText }}</span>
          </div>
        </div>

        <!-- Directions -->
        <div class="lg:col-span-3 space-y-3">
          <h3 class="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            Направления
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink to="/cases" class="text-secondary hover:text-emerald transition-colors">
                Портфолио студии
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/calculator" class="text-secondary hover:text-emerald transition-colors">
                Калькулятор стоимости
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/brief" class="text-secondary hover:text-emerald transition-colors">
                Обсудить проект
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/white-label" class="text-secondary hover:text-emerald transition-colors">
                Агентствам (White Label)
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- For Clients -->
        <div class="lg:col-span-2 space-y-3">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-muted">
            Разделы
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink to="/#for-whom" class="text-secondary hover:text-emerald transition-colors">
                Услуги
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#models" class="text-secondary hover:text-emerald transition-colors">
                Форматы работы
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#nda-manifest" class="text-secondary hover:text-emerald transition-colors">
                Принципы и NDA
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#process" class="text-secondary hover:text-emerald transition-colors">
                Этапы запуска
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Quick Channels -->
        <div class="lg:col-span-3 space-y-3">
          <h3 class="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            Прямая связь
          </h3>
          <div class="space-y-2.5">
            <a
              :href="siteConfig.contacts.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-lg border border-white/10 bg-surface px-3.5 py-2.5 text-sm font-medium text-primary hover:border-telegram/50 hover:bg-telegram/10 transition-colors"
            >
              <span class="inline-flex items-center gap-2.5">
                <TelegramIcon class="text-telegram" />
                <span>Telegram · {{ siteConfig.contacts.telegramHandle }}</span>
              </span>
              <ArrowUpRight class="h-4 w-4 text-muted" :stroke-width="1.75" />
            </a>

            <a
              :href="siteConfig.contacts.vkUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-lg border border-white/10 bg-surface px-3.5 py-2.5 text-sm font-medium text-primary hover:border-vk/50 hover:bg-vk/10 transition-colors"
            >
              <span class="inline-flex items-center gap-2.5">
                <VkIcon class="text-vk" />
                <span>ВКонтакте · Сообщество</span>
              </span>
              <ArrowUpRight class="h-4 w-4 text-muted" :stroke-width="1.75" />
            </a>

            <a
              :href="`mailto:${siteConfig.contacts.email}`"
              class="flex items-center justify-between rounded-lg border border-white/10 bg-surface px-3.5 py-2.5 text-sm font-medium text-primary hover:border-emerald/50 transition-colors"
            >
              <span class="inline-flex items-center gap-2.5">
                <Mail class="h-4 w-4 text-emerald" :stroke-width="1.75" />
                <span class="font-mono text-xs">{{ siteConfig.contacts.email }}</span>
              </span>
              <ArrowUpRight class="h-4 w-4 text-muted" :stroke-width="1.75" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Legal Strip -->
      <div class="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} {{ siteConfig.brand.name }}. {{ siteConfig.brand.tagline }}.</p>
        <p>{{ siteConfig.brand.legalNote }}</p>
      </div>
    </div>
  </footer>
</template>
