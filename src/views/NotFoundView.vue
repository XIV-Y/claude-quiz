<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="py-12 text-center">
    <h1 class="text-2xl font-bold">ページが見つかりません</h1>
    <p class="mt-2 text-slate-600">URL が間違っているか、カテゴリが削除された可能性があります。</p>
    <RouterLink
      :to="{ name: 'home' }"
      class="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      カテゴリ一覧へ戻る
    </RouterLink>
  </section>
</template>
