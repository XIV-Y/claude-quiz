<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

// public/ 配下のファイルは、公開先のパス（vite.config.ts の base）を前に付けて参照する
const logoUrl = `${import.meta.env.BASE_URL}favicon.svg`
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-3xl items-center px-4 py-3">
        <RouterLink
          :to="{ name: 'home' }"
          class="flex items-center gap-2 text-lg font-bold text-indigo-600 hover:text-indigo-700"
        >
          <img :src="logoUrl" alt="" class="size-7" />
          Claude Quiz
        </RouterLink>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
