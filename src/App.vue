<template>
  <header class="p-4 bg-slate-900 text-white ">
    <nav class="flex gap-4">
      <router-link to="/" class="hover:underline">Home</router-link>
      <router-link to="/relaciones" class="hover:underline">Relaciones</router-link>
    </nav>
  </header>

  <main class="bg-slate-100 min-h-screen">
    <router-view />
  </main>
</template>

<script setup lang="ts">
// No logic needed here for now
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
