import { createRouter, createWebHashHistory } from 'vue-router'
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
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${APP_NAME}` : APP_NAME
})

export default router
