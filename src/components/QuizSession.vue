<script setup lang="ts">
import { computed } from 'vue'
import QuizQuestionCard from '@/components/QuizQuestionCard.vue'
import QuizResult from '@/components/QuizResult.vue'
import type { RouteLocationRaw } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import type { Question } from '@/types/quiz'

const props = defineProps<{
  questions: readonly Question[]
  /** 結果画面の「戻る」ボタンの移動先 */
  backTo: RouteLocationRaw
  backLabel: string
}>()

const quiz = useQuiz(props.questions)
const { total, currentIndex, current, selectedIndex, isLast, isFinished, results, correctCount } =
  quiz

const progress = computed(() =>
  total.value === 0 ? 0 : (Math.min(currentIndex.value + 1, total.value) / total.value) * 100,
)
</script>

<template>
  <div>
    <QuizResult
      v-if="isFinished"
      :results="results"
      :correct-count="correctCount"
      :back-to="backTo"
      :back-label="backLabel"
      @restart="quiz.restart()"
    />

    <template v-else-if="current">
      <div>
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

    <p v-else class="mt-4 text-slate-500">まだ問題がありません。</p>
  </div>
</template>
