<template>
  <header class="p-4 bg-slate-900 text-white ">
    <nav class="flex gap-4">
      <router-link to="/" class="hover:underline">Elementos</router-link>
      <router-link to="/relaciones" class="hover:underline">Relaciones</router-link>
    </nav>
  </header>

  <main class="bg-slate-100 min-h-screen">
    <router-view />
    <Toast />
  </main>
</template>

<script setup lang="ts">
import { Toast } from 'primevue';

import { onMounted, onBeforeUnmount } from 'vue';

// Definimos la función manejadora
const handleBeforeUnload = (event:any) => {
    // Lógica opcional: Solo preguntar si hay cambios sin guardar
    // if (!hayCambiosSinGuardar.value) return; 

    event.preventDefault();
    event.returnValue = ''; // Necesario para navegadores basados en Chromium
};

onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
    // ¡IMPORTANTE! Siempre limpiar el listener para evitar fugas de memoria
    // o comportamientos extraños al navegar dentro de la misma SPA.
    window.removeEventListener('beforeunload', handleBeforeUnload);
});
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
