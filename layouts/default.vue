<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AppToast from '~/components/ui/AppToast.vue'
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-canvas text-primary">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <AppToast />
  </div>
</template>
