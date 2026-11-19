<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export interface BreadcrumbItem {
  readonly label: string
  /** 省略すると現在のページとして表示する */
  readonly to?: RouteLocationRaw
}

defineProps<{
  items: readonly BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="パンくずリスト">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <span v-if="index > 0" aria-hidden="true" class="text-slate-400">›</span>
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="text-slate-500 underline-offset-2 hover:text-indigo-600 hover:underline"
        >
          {{ item.label }}
        </RouterLink>
        <span v-else aria-current="page" class="font-bold text-indigo-600">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
