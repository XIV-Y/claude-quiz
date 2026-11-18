<script setup lang="ts">
import CategoryCard from '@/components/CategoryCard.vue'
import { categories } from '@/quizzes'
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold">カテゴリを選んでください</h1>
    <p class="mt-2 text-slate-600">選んだカテゴリの4択クイズが始まります。</p>

    <ul v-if="categories.length > 0" class="mt-6 grid gap-4 sm:grid-cols-2">
      <li v-for="category in categories" :key="category.id">
        <CategoryCard :category="category" />
      </li>
    </ul>
    <p v-else class="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">
      まだカテゴリがありません。
    </p>
  </section>
</template>
