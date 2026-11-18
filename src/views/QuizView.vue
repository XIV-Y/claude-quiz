<script setup lang="ts">
import { computed } from 'vue'
import QuizSession from '@/components/QuizSession.vue'
import { findCategory } from '@/quizzes'

const props = defineProps<{
  categoryId: string
}>()

// 存在しないカテゴリはルーターのガードで「ページが見つかりません」へ振り分け済み
const category = computed(() => findCategory(props.categoryId))
</script>

<template>
  <!-- カテゴリが変わったら、クイズの状態を作り直す -->
  <QuizSession v-if="category" :key="category.id" :category="category" />
</template>
