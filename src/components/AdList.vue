<template>
  <v-container>
    <h1 class="mb-3 mt-3">Мои объявления</h1>
    <v-row v-if="myAds.length" class="justify-sm-center justify-md-start">
        <v-col sm="9" md="6" v-for="(ad, i) in myAds" :key="i">
          <v-card>
            <v-row class="mx-0">
              <v-col cols="12" sm="6">
                <v-img
                  class="white--text align-end"
                  height="160px"
                  :src="ad.imageSrc"
                >
                </v-img>
              </v-col>

              <v-col cols="12" sm="6" class="d-flex flex-column">
                <v-card-text class="pl-0 pt-0 pb-0 flex-grow-1">
                  <h3>{{ ad.title }}</h3>
                  <p class="mb-0">{{ ad.description | textSlice}}</p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="secondary" 
                    dark  
                    :to="`/ad/${ad.id}`"
                  >Открыть</v-btn>
                </v-card-actions>
              </v-col>

            </v-row>
          </v-card>
        </v-col>
    </v-row>

    <v-row v-else >
      <v-col cols="12">
        <h2 class="text-center">Вы не создали ни одного объявления!</h2>
        <p class="text-center"> 
          <v-btn 
            class="myButton mt-3" 
            to="/new"
            color="secondary"
            dark
          >Создать объявление
          </v-btn>
        </p>          
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([ 
        'myAds', //аналог return this.$store.getters.myAds, можно получать и другие гетеры
      ])      
    }
  }
</script>

<style lang="scss" scoped>
  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>