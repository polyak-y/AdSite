<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row align="center" justify="center">
      <v-col sm="8" md="8" lg="6" xl="4">
        <v-card class="elevation-5">

          <v-toolbar color="primary" dark flat >
            <v-toolbar-title>Форма входа</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form 
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >

              <v-text-field
                color="primary"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
                :rules="emailRules"
              />

              <v-text-field
                color="primary"
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="pasRules"        
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid || localLoading"
              color="secondary"             
              class="myButton"
              :loading="localLoading"
              @click="onSubmit"
            >Войти</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      valid: true,
      lazy: true,
      email: '',
      emailRules: [
        v => !!v || 'Поле E-mail обязательно для заполнения',
        v => /.+@.+\..+/.test(v) || 'Введенное значение не валидно',
      ],
      password: '',
      pasRules: [
        v => !!v.trim() || 'Поле обязательно для заполнения',
        v => v.length >= 5 || 'Пароль должен быть не менее 5 символов'
      ],
      localLoading: false,   
    }
  },
  methods: {
    ...mapActions([ //аналог this.$store.dispatch('loginUser'), однако это метод и в другом методе мы его будет вызывать как this.loginUser(data)
      'loginUser'
    ]),
    onSubmit() {
      if (this.$refs.form.validate()) {      
        this.localLoading = true;

        const user = {
          email: this.email,
          password: this.password
        }
        
        this.loginUser(user)
          .then(() => {
            this.localLoading = false
            this.$router.push('/')
          })      
          .catch(err => {
            this.localLoading = false
            console.log('Ошибка = ', err)
          })  
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container.fill-height > .row {
    max-width: none;
  }

  .myButton {
    width: 100px;
    color: #fff;
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>