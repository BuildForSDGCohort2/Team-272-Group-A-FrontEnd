<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <!-- <img src="https://vuematerial.io/assets/logo-color.png"> -->
        <div class="md-title">Please Log In to continue</div>
        <!-- <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div> -->
      </div>

      <div class="form">
        <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.firstName"
                :disabled="sending" />
                <span class="md-error"
                v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error"
                v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>

              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name"
                id="last-name"
                autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error"
                v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error"
                v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>

              <md-field :class="getValidationClass('gender')">
                <label for="gender">Gender</label>
                <md-select
                name="gender"
                id="gender"
                v-model="form.gender" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="M">M</md-option>
                  <md-option value="F">F</md-option>
                </md-select>
                <span class="md-error">The gender is required</span>
              </md-field>

              <md-field :class="getValidationClass('age')">
                <label for="age">Age</label>
                <md-input type="number"
                id="age"
                name="age"
                autocomplete="age" v-model="form.age" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.age.required">The age is required</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Invalid age</span>
              </md-field>

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

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
        <md-field md-has-password>
          <label>Confirm Password</label>
          <md-input v-model="login.password-confirm" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'register',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      age: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      age: {
        required,
        maxLength: maxLength(3),
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
