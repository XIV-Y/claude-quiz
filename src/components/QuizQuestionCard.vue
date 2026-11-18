<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { PresentedQuestion } from '@/composables/useQuiz'

const props = defineProps<{
  question: PresentedQuestion
  selectedIndex: number | null
  isLast: boolean
}>()

const emit = defineEmits<{
  select: [choiceIndex: number]
  next: []
}>()

const LABELS = ['A', 'B', 'C', 'D'] as const

const isAnswered = computed(() => props.selectedIndex !== null)
const isCorrect = computed(
  () => props.selectedIndex !== null && !!props.question.choices[props.selectedIndex]?.isCorrect,
)

function choiceClass(index: number): string {
  const choice = props.question.choices[index]
  if (!isAnswered.value) {
    return 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50'
  }
  if (choice?.isCorrect) return 'border-emerald-500 bg-emerald-50'
  if (index === props.selectedIndex) return 'border-rose-500 bg-rose-50'
  return 'border-slate-200 bg-white opacity-60'
}

// 次の問題に進んだら、スクリーンリーダーやキーボード操作のために問題文へフォーカスを移す
const heading = ref<HTMLElement | null>(null)
const nextButton = ref<HTMLButtonElement | null>(null)
watch(
  () => props.question,
  async () => {
    await nextTick()
    heading.value?.focus()
  },
)
// 回答したら「次へ」ボタンへフォーカスを移し、Enter で進めるようにする
watch(isAnswered, async (answered) => {
  if (!answered) return
  await nextTick()
  nextButton.value?.focus()
})
</script>

<template>
  <article>
    <h2 ref="heading" tabindex="-1" class="text-xl leading-relaxed font-bold outline-none">
      {{ question.source.question }}
    </h2>

    <ul class="mt-6 space-y-3">
      <li v-for="(choice, index) in question.choices" :key="choice.text">
        <button
          type="button"
          :disabled="isAnswered"
          :aria-pressed="index === selectedIndex"
          class="flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-default"
          :class="choiceClass(index)"
          @click="emit('select', index)"
        >
          <span
            class="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600"
          >
            {{ LABELS[index] }}
          </span>
          <!-- 正誤のラベルは本文の下に置き、狭い画面でも本文の幅を確保する -->
          <span class="flex min-w-0 flex-col gap-1 pt-0.5">
            <span>{{ choice.text }}</span>
            <span v-if="isAnswered && choice.isCorrect" class="text-sm font-bold text-emerald-600">
              {{ index === selectedIndex ? '✓ 正解（あなたの回答）' : '✓ 正解' }}
            </span>
            <span v-else-if="index === selectedIndex" class="text-sm font-bold text-rose-600">
              × あなたの回答
            </span>
          </span>
        </button>
      </li>
    </ul>

    <div aria-live="polite">
      <section
        v-if="isAnswered"
        class="mt-6 rounded-xl border p-5"
        :class="isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'"
      >
        <p class="text-lg font-bold" :class="isCorrect ? 'text-emerald-700' : 'text-rose-700'">
          {{ isCorrect ? '正解！' : '不正解' }}
        </p>
        <p class="mt-2 leading-relaxed text-slate-700">{{ question.source.explanation }}</p>
      </section>
    </div>

    <div v-if="isAnswered" class="mt-6 flex justify-end">
      <button
        ref="nextButton"
        type="button"
        class="rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click="emit('next')"
      >
        {{ isLast ? '結果を見る' : '次の問題へ' }}
      </button>
    </div>
  </article>
</template>
