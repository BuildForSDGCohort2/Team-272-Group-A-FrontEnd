<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <!-- <img src="https://vuematerial.io/assets/logo-color.png"> -->
        <div class="md-title">Please Log In to continue</div>
        <!-- <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div> -->
      </div>

      <form class="form" novalidate @submit.prevent="validateUser">
        <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>

        <md-field md-has-password :class="getValidationClass('password')">
            <label for="password">Password</label>
          <md-input type="password"
          name="password"
          id="password"
          :disabled="sending"
          v-model="form.password" />
          <span class="md-error" v-if="!$v.form.password.required">A Password is required</span>
            <span
            class="md-error"
            v-else-if="!$v.form.password.minlength">Password must be at least 6 characters</span>
        </md-field>

        <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button type="submit"
          class="md-primary md-raised"
          :disabled="sending">Log in</md-button>
      </div>
      </form>

      <span class="md-body-1">New Here? </span>

        <router-link to="/register"> Sign Up</router-link>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'login',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    sending: false,
    lastUser: null,
    loading: false,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.email = null;
      this.form.password = null;
    },
    loginUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.email} ${this.form.password}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loginUser();
      }
    },
    auth() {
      // your code to login user
      // this is only for example of loading
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
