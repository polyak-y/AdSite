<template>
  <v-container>
   <v-row justify="center" v-if="orders.length && !localLoading">
     <v-col xs="12" sm="6">
       <h1 class="mb-2">Заказы</h1>
       <v-list two-line flat>  
        <v-list-item-group>
          <v-list-item 
            :ripple="false"
            v-for="order in orders"
            :key="order.id"   
            class="mb-0 orderComponent"                   
          >
            <v-list-item-action class="mr-5">
              <v-checkbox               
                :readonly="order.done"
                color="primary"
                v-model="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>
  
            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn 
                class="myButton"
                :to="`/ad/${order.adId}`" 
                color="secondary" 
                dark
              >Открыть</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>    
     </v-col>
   </v-row>

   <v-row v-else-if="!orders.length && !localLoading">
     <v-col cols="12">
       <h2 class="text-center">У Вас нет не одного заказа!</h2>
     </v-col>
   </v-row>

   <div class="loading" v-else>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      active: false,
      localLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'orders'
    ])
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true;
        })             
    }
  },
  mounted() {
    this.localLoading = true;

    this.$store.dispatch('fetchOrders')
      .finally(() => {
        this.localLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
    box-sizing: border-box;
  } 

  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }

  .orderComponent {
    border-bottom: 1px solid #ececec;

    &:last-child {
      border-bottom: 0;
    }
  }

</style>