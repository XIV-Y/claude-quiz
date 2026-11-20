<script setup lang="ts">
import LinkCard from '@/components/LinkCard.vue'
import { allQuestions, categories } from '@/quizzes'
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold">カテゴリを選んでください</h1>
    <p class="mt-2 text-slate-600">選んだカテゴリの中から、学びたい項目を選べます。</p>

    <ul v-if="categories.length > 0" class="mt-6 grid gap-4">
      <li v-for="category in categories" :key="category.id">
        <LinkCard
          :to="{ name: 'category', params: { categoryId: category.id } }"
          :title="category.name"
          :description="category.description"
          :meta="`${category.subcategories.length} 項目・全 ${allQuestions(category).length} 問`"
        />
      </li>
    </ul>
    <p v-else class="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">
      まだカテゴリがありません。
    </p>
  </section>
</template>
