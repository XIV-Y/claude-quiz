import type { Category } from '@/types/quiz'

/**
 * 大カテゴリの一覧。トップページにはこの順番で表示される。
 * カテゴリを追加するときは `src/quizzes/<カテゴリID>.ts` を作り、ここに登録する。
 */
export const categories: readonly Category[] = []

export function findCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}
