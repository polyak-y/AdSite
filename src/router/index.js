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
import firebase from 'firebase/app';

Vue.use(VueRouter);

const router =  new VueRouter({
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
      meta: {auth: true},
    },
    {
      path: '/new',
      name: 'NewAd',
      meta: {auth: true},
      component: NewAd,
    },
    {
      path: '/orders',
      name: 'Orders',
      meta: {auth: true},
      component: Orders,
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

router.beforeEach((to, from, next) => {

  firebase.auth().onAuthStateChanged(() => {
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth)

    if(requireAuth && !currentUser) {
      next('/login');
    } else {
      next()
    }
  })    
})

export default router;