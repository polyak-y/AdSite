import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

export default {
  state: {
    ads: []
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds(state, getters) { 
      return state.ads.filter(ad => ad.ownerId === getters.user.id)
    },
    adById(state){
      return adId => {
        return state.ads.find(ad => ad.id.toString() === adId)
      }
    }
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      state.ads = payload;
    },
    updateAd(state, { id, title, description }) {
      const ad = state.ads.find(el => el.id === id);
      ad.title = title;
      ad.description = description;
    }
  },
  actions: {
    async createAd({ commit, getters }, payload) { //добавленеие нового объявленя в базу данных
      commit('clearError')
      commit('setLoading', true)

      const imageFile = payload.imageFile;

      try {
        const newAd = {
          title: payload.title, 
          description: payload.description, 
          promo: payload.promo, 
          ownerId: getters.user.id,
          imageSrc: ''
        }

        const ad = await firebase.database().ref('/ads').push(newAd); //закидываем данные в базу данных и получаем взамен id

        const imageExt = imageFile.name.slice(imageFile.name.lastIndexOf('.')) // получаем расширение файла

        const fileData = await firebase.storage().ref(`ads/${ad.key}.${imageExt}`).put(imageFile) //закидываем картинку в хранилице, генерируя при этом ее название
        
        const imageSrc = await fileData.ref.getDownloadURL(); //получаем ссылку на картинку

        await firebase.database().ref(`/ads/${ad.key}`).update({imageSrc}); //обновляем поле imageSrc

        commit('createAd', {
          id: ad.key, 
          ...newAd, 
          imageSrc
        });
        commit('setLoading', false);

      } catch (err) {
        commit('setError', err.message);
        commit('setLoading', false);
        throw error //выбрасываем ошибку чтобы мы могли ее обработать в промисе
      }
    },
    async fetchAds({ commit }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const fbVal = await firebase.database().ref('/ads').once('value');
        const ads = fbVal.val();
  
        const newAds = Object.entries(ads).map(([key,value]) => {
          value.id = key;
          return value;
        });

        commit('loadAds', newAds)
        commit('setLoading', false);
      } catch(err) {
        commit('setError', err.message);
        commit('setLoading', false);
        throw error 
      }
    },
    async updateAd({ commit }, {id, title, description }) {
      commit('clearError')

      try {
        await firebase.database().ref(`/ads/${id}`).update({title, description}); //обновляем поля title и description
        commit('updateAd', {id, title, description});
        
      } catch(err) {
        commit('setError', err.message);
        throw error;
      }
    }
  }
}