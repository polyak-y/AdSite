import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import Ad from '@/components/Ad';
import AdList from '@/components/AdList';
import NewAd from '@/components/NewAd';
import Orders from '@/components/Orders';
import Login from '@/components/Auth/Login';
import Registration from '@/components/Auth/Registration';
import Page404 from '@/components/Page404';
import AuthGuard from './auth-guard';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'Ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'AdList',
      component: AdList,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'NewAd',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '*', //страница 404.
      component: Page404
    }
  ]   
});