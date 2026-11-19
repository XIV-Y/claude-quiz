<script setup lang="ts">
import { computed } from 'vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import LinkCard from '@/components/LinkCard.vue'
import { allQuestions, findCategory } from '@/quizzes'

const props = defineProps<{
  categoryId: string
}>()

// 存在しないカテゴリはルーターのガードで「ページが見つかりません」へ振り分け済み
const category = computed(() => findCategory(props.categoryId))
</script>

<template>
  <section v-if="category">
    <BreadcrumbNav :items="[{ label: 'トップ', to: { name: 'home' } }, { label: category.name }]" />

    <h1 class="mt-4 text-2xl font-bold">{{ category.name }}</h1>
    <p class="mt-2 text-slate-600">{{ category.description }}</p>

    <ul class="mt-6 grid gap-4 sm:grid-cols-2">
      <li class="sm:col-span-2">
        <LinkCard
          highlight
          :to="{ name: 'quiz', params: { categoryId: category.id } }"
          title="すべての問題に挑戦"
          :description="`${category.name}のすべての項目から出題します。`"
          :meta="`全 ${allQuestions(category).length} 問`"
        />
      </li>
      <li v-for="subcategory in category.subcategories" :key="subcategory.id">
        <LinkCard
          :to="{
            name: 'quiz',
            params: { categoryId: category.id, subcategoryId: subcategory.id },
          }"
          :title="subcategory.name"
          :description="subcategory.description"
          :meta="`全 ${subcategory.questions.length} 問`"
        />
      </li>
    </ul>
  </section>
</template>
