<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="100%"
      max-width="700px"
    >
      <template v-slot:activator="{ on }">
        <v-btn 
          color="primary"
          dark
          class="myButtonEditModal ml-3"
          v-on="on"
        >Купить</v-btn>
      </template>
      
      <v-card>
        <v-card-title
          class="primary titleModal"          
        >
         Окно покупки
        </v-card-title>

        <v-card-text>
           <v-form 
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >

              <v-text-field
                color="primary"
                label="Ваше имя"
                name="name"
                type="text"
                v-model="name"
                :rules="[v => !!v || 'Поле обязательно для заполнения']"
              />
              
              <v-text-field
                color="primary"
                label="Телефон"
                name="phone"
                type="text"
                v-model="phone"
                :rules="[v => !!v || 'Поле обязательно для заполнения']"
              />
            </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            class="myButtonEditModal" 
            @click="onCancel"
            :disabled="localLoading"
          >Отмена</v-btn>

          <v-btn 
            class="myButtonEditModal" 
            :disabled="!valid || localLoading" 
            :loading="localLoading"
            @click="onSave"
          >Подтвердить</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['ad'],
    data() {
      return {
        dialog: false,
        valid: false,
        lazy: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      onCancel() { //клик на кнопку отмена
        this.dialog = false;
        this.name = '';
        this.phone = '';
        this.$refs.form.resetValidation();
      },
      onSave() { //клик на кнопку редактировать
        if (this.$refs.form.validate()) {

          this.localLoading = true;

          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .finally(() => {
            this.localLoading = false;
            this.name = '';
            this.phone = '';
            this.$refs.form.resetValidation();
            this.dialog = false;
          });
          
          
        }
      }
    }
  }
</script>

<style lang="scss">
  .myButtonEditModal {
    text-transform: none;
    letter-spacing: normal;
  }

  .titleModal {
    color: #fff;
  }

  .v-text-field--outlined.v-input--is-focused fieldset {
    border: 1px solid currentColor;
  }

  .v-text-field--outlined.v-input--has-state fieldset {
    border: 1px solid currentColor;
  }
</style>