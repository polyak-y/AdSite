<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="ad">
          <v-img
            :src="ad.imageSrc"
            height="300"
            class="grey darken-4"
          ></v-img>

          <v-card-text>
            <h1 class="mb-3">{{ ad.title }}</h1>
            <p class="mb-0">{{ ad.description }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>          
            <app-edit-ad-modal v-if="isOwner" :ad="ad"></app-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAddModal from './EditAdModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading() {
      return this.$store.getters.loading
    },
    isOwner() {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditAdModal: EditAddModal
  }
}
</script>

<style lang="scss" scoped>
  .myButton {
    text-transform: none;
    letter-spacing: normal;
  }
</style>