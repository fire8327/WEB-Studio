<script setup lang="ts">
import type { NuxtError } from '#app'
import { ArrowLeft } from 'lucide-vue-next'
import BrandLogo from '~/components/icons/BrandLogo.vue'

defineProps<{
  error: NuxtError
}>()

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-dvh flex flex-col items-center justify-center bg-canvas px-4 text-center text-primary">
    <div class="max-w-md space-y-6 rounded-2xl border border-white/12 bg-surface p-8 shadow-elevated">
      <div class="flex justify-center">
        <BrandLogo />
      </div>
      <div class="font-mono text-5xl font-extrabold text-emerald tabular-nums">
        {{ error.statusCode }}
      </div>
      <h1 class="font-sans text-xl font-bold text-primary">
        {{ error.statusCode === 404 ? 'Страница не найдена' : 'Временная ошибка сервера' }}
      </h1>
      <p class="text-sm text-secondary">
        {{ error.statusMessage || 'Проверьте адрес маршрута или вернитесь на главную страницу студии.' }}
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-5 py-3 text-sm btn-emerald"
        @click="handleClear"
      >
        <ArrowLeft class="h-4 w-4" :stroke-width="2" />
        Вернуться на главную
      </button>
    </div>
  </div>
</template>
