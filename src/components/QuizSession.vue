<script setup lang="ts">
import { computed } from 'vue'
import QuizQuestionCard from '@/components/QuizQuestionCard.vue'
import QuizResult from '@/components/QuizResult.vue'
import { useQuiz } from '@/composables/useQuiz'
import { allQuestions } from '@/quizzes'
import type { Category } from '@/types/quiz'

const props = defineProps<{
  category: Category
}>()

const quiz = useQuiz(allQuestions(props.category))
const { total, currentIndex, current, selectedIndex, isLast, isFinished, results, correctCount } =
  quiz

const progress = computed(() =>
  total.value === 0 ? 0 : (Math.min(currentIndex.value + 1, total.value) / total.value) * 100,
)
</script>

<template>
  <div>
    <p class="text-sm font-bold text-indigo-600">{{ category.name }}</p>

    <QuizResult
      v-if="isFinished"
      class="mt-4"
      :results="results"
      :correct-count="correctCount"
      @restart="quiz.restart()"
    />

    <template v-else-if="current">
      <div class="mt-2">
        <p class="text-sm text-slate-500">問題 {{ currentIndex + 1 }} / {{ total }}</p>
        <div
          class="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          :aria-valuenow="currentIndex + 1"
          aria-valuemin="1"
          :aria-valuemax="total"
          :aria-label="`問題 ${currentIndex + 1} / ${total}`"
        >
          <div class="h-full bg-indigo-500 transition-all" :style="{ width: `${progress}%` }" />
        </div>
      </div>

      <QuizQuestionCard
        class="mt-6"
        :question="current"
        :selected-index="selectedIndex"
        :is-last="isLast"
        @select="quiz.select"
        @next="quiz.next()"
      />
    </template>

    <p v-else class="mt-4 text-slate-500">このカテゴリにはまだ問題がありません。</p>
  </div>
</template>
