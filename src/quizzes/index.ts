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
