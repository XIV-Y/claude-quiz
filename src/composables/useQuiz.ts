import { computed, ref } from 'vue'
import type { Category, Question } from '@/types/quiz'
import { shuffle } from '@/utils/shuffle'

/** 画面に表示する選択肢 */
export interface PresentedChoice {
  readonly text: string
  readonly isCorrect: boolean
}

/** 画面に表示する1問（選択肢はシャッフル済み） */
export interface PresentedQuestion {
  readonly source: Question
  readonly choices: readonly PresentedChoice[]
}

/** 1問分の回答結果 */
export interface QuestionResult {
  readonly question: PresentedQuestion
  readonly selectedIndex: number
  readonly isCorrect: boolean
}

function present(question: Question): PresentedQuestion {
  return {
    source: question,
    choices: shuffle(
      question.choices.map((text, index) => ({ text, isCorrect: index === question.answerIndex })),
    ),
  }
}

/** カテゴリのクイズを1回分進めるための状態と操作 */
export function useQuiz(category: Category) {
  const questions = ref<PresentedQuestion[]>([])
  const answers = ref<(number | null)[]>([])
  const currentIndex = ref(0)

  function start() {
    questions.value = shuffle(category.questions).map(present)
    answers.value = questions.value.map(() => null)
    currentIndex.value = 0
  }
  start()

  const total = computed(() => questions.value.length)
  const isFinished = computed(() => currentIndex.value >= total.value)
  const isLast = computed(() => currentIndex.value === total.value - 1)
  const current = computed(() => questions.value[currentIndex.value])
  const selectedIndex = computed(() => answers.value[currentIndex.value] ?? null)

  const results = computed<QuestionResult[]>(() =>
    questions.value.flatMap((question, index) => {
      const selected = answers.value[index]
      if (selected === null || selected === undefined) return []
      return [
        { question, selectedIndex: selected, isCorrect: !!question.choices[selected]?.isCorrect },
      ]
    }),
  )
  const correctCount = computed(() => results.value.filter((result) => result.isCorrect).length)

  /** 現在の問題に回答する。回答済みの問題は変更できない */
  function select(choiceIndex: number) {
    if (isFinished.value || selectedIndex.value !== null) return
    answers.value[currentIndex.value] = choiceIndex
  }

  /** 回答済みなら次の問題（最後の問題なら結果）へ進む */
  function next() {
    if (selectedIndex.value === null) return
    currentIndex.value++
  }

  return {
    total,
    currentIndex,
    current,
    selectedIndex,
    isLast,
    isFinished,
    results,
    correctCount,
    select,
    next,
    restart: start,
  }
}
