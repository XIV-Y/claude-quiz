<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { allQuestions } from '@/quizzes'
import type { Category } from '@/types/quiz'

defineProps<{
  category: Category
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'quiz', params: { categoryId: category.id } }"
    class="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
  >
    <h2 class="text-lg font-bold group-hover:text-indigo-600">{{ category.name }}</h2>
    <p class="mt-2 flex-1 text-sm text-slate-600">{{ category.description }}</p>
    <p class="mt-4 text-sm font-medium text-indigo-600">
      全 {{ allQuestions(category).length }} 問に挑戦する →
    </p>
  </RouterLink>
</template>
