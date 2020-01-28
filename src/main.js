import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import App from './App.vue';
import BuyModal from './components/BuyModal';
import router  from './router';
import store from './store';
import * as firebase from 'firebase';
import colors from 'vuetify/lib/util/colors';


Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.brown.darken3,
        secondary: colors.brown.lighten1
      },
    },
  },
});

Vue.filter('textSlice', (value) => { 
  const text = value.length > 105 ? value.slice(0,105).trim() + '...' : value;
  return text;
});

Vue.component('appBuyModal', BuyModal);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyD972_8-vTNBWytiYK_OPB6n1V5xW4ULFY",
      authDomain: "vp-adprogect.firebaseapp.com",
      databaseURL: "https://vp-adprogect.firebaseio.com",
      projectId: "vp-adprogect",
      storageBucket: "vp-adprogect.appspot.com",
      messagingSenderId: "346691072651",
      appId: "1:346691072651:web:9c333b3cd5c35216909a8e"
    };
    firebase.initializeApp(firebaseConfig);

  }
}).$mount('#app');
