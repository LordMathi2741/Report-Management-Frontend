import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/', component: () => import('../pages/sign-in-page.page.vue')},
    { path: '/sign-in', component: () => import('../pages/sign-in-page.page.vue') },
    {path:'/search', component: () => import('../pages/search-report-page.page.vue')},
    {path:'/sign-up', component: () => import('../pages/sign-up-page.page.vue')},
    {path:'/profile', component: () => import('../pages/profile-management-page.page.vue')},
    {path:'/report-chart', component: () => import('../pages/report-chart-page.page.vue')},
    {path:'/report-chart-operation-center', component: () => import('../pages/report-chart-operation-center-page.page.vue')},
    {path:'/report-chart-type', component: () => import('../pages/report-chart-type-page.page.vue')},
    {path: '/report-details', component : ()=> import('../pages/search-report-details-page.page.vue')},
    {path: '/total-reports-chart', component : ()=> import('../pages/total-reports-chart-page.page.vue')},
  ]
})

export default router
