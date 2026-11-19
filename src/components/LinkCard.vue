<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
  title: string
  description: string
  /** カード下部に表示する補足（例：問題数） */
  meta: string
  /** 「すべての問題に挑戦」など、ほかのカードと区別して目立たせる */
  highlight?: boolean
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex h-full flex-col rounded-xl border p-5 shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    :class="
      highlight
        ? 'border-indigo-200 bg-indigo-50 hover:border-indigo-400'
        : 'border-slate-200 bg-white hover:border-indigo-300'
    "
  >
    <h2 class="text-lg font-bold group-hover:text-indigo-600">{{ title }}</h2>
    <p class="mt-2 flex-1 text-sm text-slate-600">{{ description }}</p>
    <p class="mt-4 text-sm font-medium text-indigo-600">{{ meta }} →</p>
  </RouterLink>
</template>
