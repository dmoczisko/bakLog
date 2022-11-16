import { createRouter, createWebHistory } from 'vue-router';
import ViewAuth from '@/views/ViewAuth.vue';
import ViewGamesList from '@/views/ViewGamesList.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ViewAuth
    },
    {
      path: '/my-games',
      name: 'my-games',
      component: ViewGamesList
    },
    {
      path: '/main-collection',
      name: 'main-collection',
      component: ViewGamesList
    }
  ]
});

export default router;
