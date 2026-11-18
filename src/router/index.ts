import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
})

export default router
