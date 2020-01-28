<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="100%"
      max-width="700px"
    >
      <template v-slot:activator="{ on }">
        <v-btn 
          class="myButtonEditModal"
          v-on="on"
        >Редактировать</v-btn>
      </template>
      
      <v-card>
        <v-card-title
          class="primary titleModal"          
        >
         Редактирование объявления
        </v-card-title>

        <v-card-text>
           <v-form 
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >

              <v-text-field
                color="primary"
                label="Название"
                name="title"
                type="text"
                v-model="editedTitle"
                :rules="[v => !!v || 'Поле обязательно для заполнения']"
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
                v-model="editedDescripton"
                :rules="[v => !!v || 'Поле Описание обязательно для заполнения']"    
              ></v-textarea>
            </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="myButtonEditModal" @click="onCancel">Отмена</v-btn>
          <v-btn class="myButtonEditModal" :disabled="!valid" @click="onEdit">Отредактировать</v-btn>
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
        editedDescripton: this.ad.description,
        editedTitle: this.ad.title,
      }
    },
    methods: {
      onCancel() { //клик на кнопку отмена
        this.dialog = false;
        this.editedDescripton = this.ad.description;
        this.editedTitle = this.ad.title;
      },
      onEdit() { //клик на кнопку редактировать
        if (this.$refs.form.validate()) {

          this.$store.dispatch('updateAd', {
            id: this.ad.id,
            title: this.editedTitle,
            description: this.editedDescripton,
          });
          
          this.dialog = false;
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