<script setup lang="ts">
import { computed } from 'vue'
import BreadcrumbNav, { type BreadcrumbItem } from '@/components/BreadcrumbNav.vue'
import QuizSession from '@/components/QuizSession.vue'
import { resolveQuizScope } from '@/quizzes'

const props = defineProps<{
  categoryId: string
  subcategoryId?: string
}>()

// 存在しないカテゴリ・サブ項目はルーターのガードで「ページが見つかりません」へ振り分け済み
const scope = computed(() => resolveQuizScope(props.categoryId, props.subcategoryId || undefined))

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  if (!scope.value) return []
  const { category, subcategory } = scope.value
  return [
    { label: 'トップ', to: { name: 'home' } },
    { label: category.name, to: { name: 'category', params: { categoryId: category.id } } },
    { label: subcategory ? subcategory.name : 'すべての問題' },
  ]
})
</script>

<template>
  <div v-if="scope">
    <BreadcrumbNav :items="breadcrumbs" />
    <!-- 出題範囲が変わったら、クイズの状態を作り直す -->
    <QuizSession
      :key="`${scope.category.id}/${scope.subcategory?.id ?? ''}`"
      class="mt-4"
      :questions="scope.questions"
      :back-to="{ name: 'category', params: { categoryId: scope.category.id } }"
      :back-label="`${scope.category.name}の項目一覧へ戻る`"
    />
  </div>
</template>
