import firebase from 'firebase/app';
import 'firebase/database';

export default {
  state: {
    orders: []
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders(state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return [...getters.undoneOrders, ...getters.doneOrders];
    }
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload;
    },
    clearOrders(state) {
      state.orders = []
    }
  }, 
  actions: {
    async createOrder ({ commit }, payload) {
      commit('clearError')
      const order = {
        name: payload.name,
        phone: payload.phone,
        adId: payload.adId,
        done: false,
      }

      try {
        await firebase.database().ref(`users/${payload.ownerId}/orders`).push(order)
      } catch(err) {
        commit('setError', err.message)
        throw error
      }
    },
    async fetchOrders ({ commit, getters }) {
      commit('clearError');
      commit('clearOrders')

      try {
        const fbFetch = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value');
        const orders = await fbFetch.val();

        const resultOrders = Object.entries(orders).map(([key, value]) => {
          return {...value, id: key}
        });

        commit('loadOrders', resultOrders);
      } catch(err) {
        console.log(err);
      }
    },
    async markOrderDone ({ commit, getters}, payload) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders/${payload}`).update({done: true})
      } catch (err) {
        commit('setError', err.message);
        throw error
      }
    }
  }
}