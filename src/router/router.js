import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/sign-in', component: () => import('../pages/sign-in-page.page.vue') },
    {path:'/search', component: () => import('../pages/search-report-page.page.vue')},
  ]
})

export default router
