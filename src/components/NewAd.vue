<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="9" md="6">
        <h1 class="mb-3">Создать новую рекламу</h1>
        <v-card class="pa-4">
          <v-form 
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-text-field
              color="primary"
              label="Заголовок"
              name="title"
              type="text"
              v-model="title"
              :rules="[v => !!v || 'Поле Заголовок обязательно для заполнения']"
            />

            <v-textarea
              class="mt-3"
              :dense="true"
              color="primary"
              label="Описание"
              outlined
              rows="3"
              row-height="25"
              auto-grow
              name="descripton"
              v-model="descripton"
              :rules="[v => !!v || 'Поле Описание обязательно для заполнения']"    
            ></v-textarea>
          </v-form>

          <v-row>
            <v-col cols="12" class="pt-0">
              <v-btn
                color="secondary"
                class="white--text"
                @click="triggerUpload"
              >
                Загрузить
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
              <input 
                ref="fileInput" 
                type="file" 
                accept="image/*" 
                style="display: none"
                @change="onFileChange"
              >
            </v-col>

            <v-col cols="12" class="pt-0 pb-0">
              <img class="imgForm" v-if="imageSrc" :src="imageSrc" alt="">
            </v-col>            
          </v-row>

          <v-row>
            <v-col cols=12>
              <v-switch
                class="mt-0"
                color="primary"
                v-model="promo"
                label="Добавить в промо"
              ></v-switch>
            </v-col>
          </v-row>
         
          <v-row>
            <v-col cols=12>
              <v-spacer></v-spacer>
              <v-btn 
                class="buttonAdNew"
                :disabled="!valid || !imageFile || loading"
                color="secondary"                
                @click="createdAt"
                :loading="loading"
              >Создать объявление</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      valid: false,
      lazy: false,
      title: '',
      descripton: '',
      promo: false,
      imageFile: null,
      imageSrc: ''
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  methods: {
    createdAt() {
      if(this.$refs.form.validate() && this.imageFile) {
        const ad = {
          title: this.title,
          description: this.descripton,
          promo: this.promo,
          imageFile: this.imageFile
        }

        this.$store.dispatch('createAd', ad)
          .then(() => this.$router.push('/list'))
          .catch(() => {})
      }      
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0]
      
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        this.imageSrc = reader.result;
      });

      reader.readAsDataURL(file);
      this.imageFile = file;
    }
  },

}
</script>

<style lang="scss">
  .buttonAdNew {
    color: #fff!important;
    text-transform: none;
    letter-spacing: normal;
  }

  .imgForm {
    max-width: 250px;
    height: auto;
  }

  .v-text-field--outlined.v-input--is-focused fieldset {
    border: 1px solid currentColor;
  }

  .v-text-field--outlined.v-input--has-state fieldset {
    border: 1px solid currentColor;
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>