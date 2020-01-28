<template>
<div>
  <v-container fluid>
   <v-row>
     <v-col>
       <v-carousel>
        <v-carousel-item
          v-for="item in promoAds"
          :key="item.id"
          :src="item.imageSrc"
          :to="`/ad/${item.id}`"
          class="pointer"
        >
        </v-carousel-item>
       </v-carousel>
     </v-col>
   </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col
        v-for="ad in ads"
        :key="ad.id"
        md="4"
        sm="6"
        xs="12"
        class="d-flex"
      >
        <v-card class="mx-auto d-flex flex-column">
          <v-img
            class="white--text align-end"
            height="200px"
            max-height="200px"
            :src="ad.imageSrc"
          ></v-img>    

          <v-card-text class="text--primary flex-grow-1">
            <h3>{{ ad.title }}</h3>
            <div>{{ ad.description | textSlice }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              :to="`/ad/${ad.id}`"
              class="myButton" 
              color="primary" 
              text>Открыть</v-btn>

            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
 computed: {
   promoAds() {
     return this.$store.getters.promoAds
   },
   ads() {
     return this.$store.getters.ads
   }
 }
}
</script>

<style lang="scss" scoped>
  .myButton {
    text-transform: capitalize!important;
    letter-spacing: normal;
  }

  .pointer {
    cursor: pointer;
  }
</style>