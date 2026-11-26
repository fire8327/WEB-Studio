<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { FaqItem } from '~/types'

defineProps<{
  items: FaqItem[]
  title?: string
}>()

const openId = ref<string | null>(null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section class="bg-canvas-alt py-14 sm:py-20 border-t border-white/[0.06]">
    <div class="mx-auto max-w-narrow px-4 sm:px-6 lg:px-8">
      <div class="mb-8 reveal-item">
        <div class="studio-eyebrow">
          <span>Вопросы и ответы</span>
        </div>
        <h2 class="mt-4 font-display text-2xl sm:text-3xl font-bold text-primary">
          {{ title ?? 'Ответы перед стартом' }}
        </h2>
      </div>

      <div class="space-y-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="rounded-xl border border-white/10 bg-surface overflow-hidden"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
            :aria-expanded="openId === item.id"
            @click="toggle(item.id)"
          >
            <span class="font-sans text-sm sm:text-base font-bold text-primary">
              {{ item.question }}
            </span>
            <ChevronDown
              class="h-4 w-4 text-emerald shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': openId === item.id }"
              :stroke-width="2"
            />
          </button>

          <div
            v-if="openId === item.id"
            class="border-t border-white/[0.06] px-5 py-4 text-sm leading-relaxed text-secondary"
          >
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
