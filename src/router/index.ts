// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/special/:code',
    component: () => import('../views/SpecialView.vue')
  },
//   {
//     path: '/card/:code',
//     component: () => import('../components/BlessingCard.vue')
//   },
//   {
//     path: '/gallery',
//     component: () => import('../components/BlessingGallery.vue')
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
