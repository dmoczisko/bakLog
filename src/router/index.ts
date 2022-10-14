import { createRouter, createWebHistory } from 'vue-router';
import ViewAuth from '@/views/ViewAuth.vue';
import ViewGamesList from '@/views/ViewGamesList.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: ViewAuth
    },
    {
      path: '/games',
      name: 'games',
      component: ViewGamesList
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

export default router;
