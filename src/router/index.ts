import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/index.vue')
    },
    {
      path: '/relaciones',
      name: 'relaciones',
      component: () => import('../pages/relaciones.vue')
    }
  ],
})

export default router
