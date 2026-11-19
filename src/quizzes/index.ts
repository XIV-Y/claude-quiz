import type { Category, Question, Subcategory } from '@/types/quiz'
import { network } from './network'

/**
 * 大カテゴリの一覧。トップページにはこの順番で表示される。
 * カテゴリを追加するときは `src/quizzes/<カテゴリID>.ts` を作り、ここに登録する。
 */
export const categories: readonly Category[] = [network]

export function findCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function findSubcategory(category: Category, id: string): Subcategory | undefined {
  return category.subcategories.find((subcategory) => subcategory.id === id)
}

/** カテゴリ内のすべてのサブ項目の問題 */
export function allQuestions(category: Category): Question[] {
  return category.subcategories.flatMap((subcategory) => subcategory.questions)
}

/** クイズの出題範囲（カテゴリ全体、またはカテゴリ内の1つのサブ項目） */
export interface QuizScope {
  readonly category: Category
  /** サブ項目を指定しない場合はカテゴリ全体が出題範囲 */
  readonly subcategory?: Subcategory
  readonly questions: readonly Question[]
  /** 画面のタイトルに使う名前 */
  readonly title: string
}

/** URL のパラメーターから出題範囲を決める。存在しないカテゴリ・サブ項目なら undefined */
export function resolveQuizScope(
  categoryId: string,
  subcategoryId?: string,
): QuizScope | undefined {
  const category = findCategory(categoryId)
  if (!category) return undefined
  if (!subcategoryId) {
    return {
      category,
      questions: allQuestions(category),
      title: `${category.name}（すべての問題）`,
    }
  }
  const subcategory = findSubcategory(category, subcategoryId)
  if (!subcategory) return undefined
  return {
    category,
    subcategory,
    questions: subcategory.questions,
    title: `${subcategory.name}（${category.name}）`,
  }
}
