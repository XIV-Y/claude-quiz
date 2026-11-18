<script setup lang="ts">
const message: string = 'Hello World'
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
  </main>
</template>

<style scoped>
main {
  display: grid;
  place-items: center;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
}
</style>
