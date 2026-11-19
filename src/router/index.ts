import { createRouter, createWebHashHistory } from 'vue-router'
import { findCategory, resolveQuizScope } from '@/quizzes'
import HomeView from '@/views/HomeView.vue'

const APP_NAME = 'Claude Quiz'

declare module 'vue-router' {
  interface RouteMeta {
    /** ページのタイトル。`<title>` に「<title> | Claude Quiz」の形で表示する */
    title?: string
  }
}

// 静的ホスティング（サーバー側のフォールバック設定なし）でもリロードで 404 にならないよう
// ハッシュモードを採用。ホスティング先で SPA フォールバックを設定できる場合は
// createWebHistory(import.meta.env.BASE_URL) に変更可能。
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category/:categoryId',
      name: 'category',
      component: () => import('@/views/CategoryView.vue'),
      props: true,
    },
    {
      // サブ項目を省略するとカテゴリ内のすべての問題を出題する
      path: '/quiz/:categoryId/:subcategoryId?',
      name: 'quiz',
      component: () => import('@/views/QuizView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'ページが見つかりません' },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// 存在しないカテゴリ・サブ項目は「ページが見つかりません」を表示し、存在すればその名前をタイトルにする。
// 同じルートでパラメーターだけ変わる場合（URL の直接編集など）にも効くよう、全体のガードで判定する。
router.beforeEach((to) => {
  if (to.name !== 'category' && to.name !== 'quiz') return

  const categoryId = String(to.params.categoryId)
  const subcategoryId = to.params.subcategoryId ? String(to.params.subcategoryId) : undefined
  const title =
    to.name === 'category'
      ? findCategory(categoryId)?.name
      : resolveQuizScope(categoryId, subcategoryId)?.title

  if (!title) {
    return {
      name: 'not-found',
      params: { pathMatch: to.path.slice(1).split('/') },
      query: to.query,
      hash: to.hash,
      replace: true,
    }
  }
  to.meta.title = title
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${APP_NAME}` : APP_NAME
})

export default router
