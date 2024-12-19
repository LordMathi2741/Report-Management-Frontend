import { createRouter } from 'vue-router';
import { createWebHashHistory } from 'vue-router';

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

const routes = [
  { path: '/', component: () => import('../pages/sign-in-page.page.vue'), meta: { requiresAuth: false } },
  { path: '/sign-in', component: () => import('../pages/sign-in-page.page.vue'), meta: { requiresAuth: false } },
  { path: '/sign-up', component: () => import('../pages/sign-up-page.page.vue'), meta: { requiresAuth: false } },
  { path: '/search', component: () => import('../pages/search-report-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/profile', component: () => import('../pages/profile-management-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/report-chart', component: () => import('../pages/report-chart-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/report-chart-operation-center', component: () => import('../pages/report-chart-operation-center-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/report-chart-type', component: () => import('../pages/report-chart-type-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/report-details', component: () => import('../pages/search-report-details-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/total-reports-chart', component: () => import('../pages/total-reports-chart-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/report-options-search', component: () => import('../pages/choose-option-search.page.vue'), meta: { requiresAuth: true } },
  { path: '/search-pec', component: () => import('../pages/search-pec-page.page.vue'), meta: { requiresAuth: true } },
  { path: '/user-report', component: () => import('../pages/user-report.page.vue'), meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();

  if (!isAuth && to.meta.requiresAuth) {
    next({ path: '/sign-in' });
  } else if (isAuth && (to.path === '/sign-in' || to.path === '/sign-up' || to.path === '/')) {
    next({ path: '/profile' });
  } else {
    next();
  }
});


export default router;
