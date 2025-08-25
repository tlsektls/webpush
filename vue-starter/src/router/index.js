import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * Index
 */
import Index from '@/views/Index.vue';

/**
 * Error
 */
import PageNotFound from '@/views/404.vue';
import InternalServerError from '@/views/500.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    component: PageNotFound,
    name: 'pageNotFound',
  },
  {
    path: '*',
    component: InternalServerError,
    name: 'internalServerError',
  },
  {
    path: '/',
    component: Index,
    name: 'index',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'Login',
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUp.vue'),
    name: 'SignUp',
  },
  {
    path: '/pushtest',
    component: () => import('@/components/PushTest.vue'),
    name: 'pushTest',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
