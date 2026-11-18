<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { QuestionResult } from '@/composables/useQuiz'

const props = defineProps<{
  results: readonly QuestionResult[]
  correctCount: number
}>()

const emit = defineEmits<{
  restart: []
}>()

const total = computed(() => props.results.length)
const rate = computed(() =>
  total.value === 0 ? 0 : Math.round((props.correctCount / total.value) * 100),
)
const message = computed(() => {
  if (rate.value === 100) return '全問正解です！'
  if (rate.value >= 70) return 'よくできました。間違えた問題を復習しましょう。'
  return '解説を読んで、もう一度挑戦してみましょう。'
})
</script>

<template>
  <section>
    <div class="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h2 class="text-lg font-bold text-slate-600">結果</h2>
      <p class="mt-2 text-4xl font-bold text-indigo-600">
        {{ correctCount }} <span class="text-2xl text-slate-500">/ {{ total }} 問正解</span>
      </p>
      <p class="mt-1 text-slate-500">正答率 {{ rate }}%</p>
      <p class="mt-4 font-medium">{{ message }}</p>
    </div>

    <h3 class="mt-8 text-lg font-bold">振り返り</h3>
    <ol class="mt-4 space-y-4">
      <li
        v-for="(result, index) in results"
        :key="result.question.source.id"
        class="rounded-xl border bg-white p-5"
        :class="result.isCorrect ? 'border-emerald-200' : 'border-rose-200'"
      >
        <p
          class="text-sm font-bold"
          :class="result.isCorrect ? 'text-emerald-600' : 'text-rose-600'"
        >
          第{{ index + 1 }}問 {{ result.isCorrect ? '○ 正解' : '× 不正解' }}
        </p>
        <p class="mt-1 font-bold">{{ result.question.source.question }}</p>
        <dl class="mt-3 space-y-1 text-sm">
          <div v-if="!result.isCorrect" class="flex gap-2">
            <dt class="shrink-0 text-slate-500">あなたの回答：</dt>
            <dd class="text-rose-700">{{ result.question.choices[result.selectedIndex]?.text }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="shrink-0 text-slate-500">正解：</dt>
            <dd class="text-emerald-700">
              {{ result.question.choices.find((choice) => choice.isCorrect)?.text }}
            </dd>
          </div>
        </dl>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">
          {{ result.question.source.explanation }}
        </p>
      </li>
    </ol>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <button
        type="button"
        class="rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click="emit('restart')"
      >
        もう一度挑戦する
      </button>
      <RouterLink
        :to="{ name: 'home' }"
        class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        カテゴリ一覧へ戻る
      </RouterLink>
    </div>
  </section>
</template>
