import * as firebase from 'firebase';

export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedin(state) {
      return !!state.user
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({commit}, {email, password}) { //клик на кнопку зарегистрироваться
      commit('clearError');     
      
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        commit('setLoading', true)
        commit('setUser', {id: user.uid});
        commit('setLoading', false); //commit из shared.js
        console.log('Удачно')
      } catch (error) {
        console.log('неудачно!')
        commit('setError', error.message)
        throw error
      }        
    },
    async loginUser({commit}, {email, password}) { //клик на кнопку войти
      commit('clearError')

      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
        commit('setLoading', true)
        commit('setUser', {id: user.uid})      
        commit('setLoading', false)  
        console.log('Удачно зашел')
      } catch(error) {
        commit('setError', error.message)//commit из shared.js   
        throw error
      }
    },
    autoLoginUser({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },
    async logoutUser() {
      await firebase.auth().signOut();      
    },
    userNull({commit}) {
      commit('setUser', null)
    }
  }  
}