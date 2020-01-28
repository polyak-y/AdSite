<template>
  <div>
    <v-app v-if="!loading">
      <v-navigation-drawer 
        app 
        temporary
        v-model="drawer"
      >
        <v-list>
          <v-list-item 
            :to="link.url" 
            v-for="(link, ind) of links" 
            :key="ind"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>   
          </v-list-item>

          <v-list-item 
            @click="onLogout"
            v-if="isUserLoggedIn"
          >
            <v-list-item-icon>
              <v-icon>mdi-exit-run</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="'Выйти'"></v-list-item-title>
            </v-list-item-content>   
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="brown darken-3" dark>
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link tag="span" class="pointer" to="/">Next step</router-link>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>  

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn :to="link.url" text v-for="(link, ind) of links" :key="ind" class="myButton">
            <v-icon left :size="23">{{ link.icon }}</v-icon>
            {{ link.title }}
          </v-btn>      
          
          <v-btn 
            text 
            class="myButton" 
            @click="onLogout"
            v-if="isUserLoggedIn"
          >
            <v-icon left :size="23">mdi-exit-run</v-icon>
            Выйти
          </v-btn>      
        </v-toolbar-items>
      </v-app-bar>

      <v-content>    
          <router-view></router-view>
      </v-content>

      <v-snackbar
        :value="!!error"
        :top="true"
        color="error"
        :multi-line="true"
        :timeout="5000"
      >
        {{ error }}
        <v-btn
          icon
          dark
          text
          @click="closeError"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-snackbar>
    </v-app>

    <div class="loading" v-else>
      <v-progress-circular
        :size="50"
        color="brown darken-3"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'App',
  data: () => ({
    drawer: null,     
  }),
  computed: {
    error() {
      return this.$store.getters.error
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedin
    },
    links() {
      if(this.isUserLoggedIn) {
        return [
          {title: 'Заказы', icon: 'mdi-bookmark-outline', url: '/orders'},
          {title: 'Добавить рекламу', icon: 'mdi-note-plus-outline', url: '/new'},
          {title: 'Моя реклама', icon: 'mdi-clipboard-list-outline', url: '/list'}
        ];        
      } else {
        return [
          {title: 'Войти', icon: 'mdi-lock-outline', url: '/login'},
          {title: 'Регистрация', icon: 'mdi-baby-face-outline', url: '/registration'}
        ];
      }
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
    onLogout() {
      this.$store.dispatch('logoutUser')
      .then(() => {
        this.$router.push('/')
        this.$store.dispatch('userNull')
      })
    }
  },
  mounted() { //проверка при перезагрузке на зареген ли пользователь или нет
    firebase.auth().onAuthStateChanged(user => { //проверка при первой загрузке и перезагрузке на то зареген ли пользователь
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    });

    this.$store.dispatch('fetchAds');
  }
};
</script>

<style lang="scss" scoped>
  
  .myButton {
    padding-left: 20px!important;
    padding-right: 20px!important;
    text-transform: capitalize!important;
    letter-spacing: normal!important;
  }

  .pointer {
    cursor: pointer;
  } 

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    box-sizing: border-box;
  }
  
</style>
