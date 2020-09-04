<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Create an Account</div>
      </div>

      <form novalidate class="form" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('fullName')">
          <label for="full-name">Full Name</label>
          <md-input name="full-name"
          id="full-name" autocomplete="given-name"
          v-model="form.fullName"
            :disabled="sending" />
          <span class="md-error" v-if="!$v.form.fullName.required">Your full name is required</span>
          <span class="md-error" v-else-if="!$v.form.fullName.minlength">Invalid full name</span>
        </md-field>

        <div>
          <md-datepicker
          v-model="form.dateOfBirth"
          :class="getValidationClass('dateOfBirth')" name="date-of-birth"
            id="date-of-birth">
            <label for="date-of-birth">Date of Birth</label>
            <span class="md-error"
            v-if="!$v.form.dateOfBirth.required"
            >Date Of Birth is required</span>
          </md-datepicker>
        </div>

        <md-field :class="getValidationClass('gender')">
          <label for="gender">Gender</label>
          <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
            <md-option></md-option>
            <md-option value="M">M</md-option>
            <md-option value="F">F</md-option>
          </md-select>
          <span class="md-error">The gender is required</span>
        </md-field>

        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
            :disabled="sending" />
          <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
          <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
        </md-field>

        <md-field md-has-password :class="getValidationClass('password')">
          <label for="password">Password</label>
          <md-input type="password" name="password"
          id="password" :disabled="sending" v-model="form.password" />

          <span class="md-error" v-if="!$v.form.password.required">A Password is required</span>
          <span class="md-error"
          v-else-if="!$v.form.password.minlength">Password must be at least 6 characters </span>
        </md-field>

        <md-field md-has-password :class="getValidationClass('confirmPassword')">
          <label for="confirmPassword">Confirm Password</label>
          <md-input type="password" name="confirmPassword" id="confirmPassword" :disabled="sending"
            v-model="form.confirmPassword" />
          <span class="md-error"
          v-if="!$v.form.confirmPassword.required"
          >Confirm Password is required</span>
          <span class="md-error" v-else-if="!$v.form.confirmPassword.sameAsPassword">
            Passwords don't match</span>
        </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create Account</md-button>
        </md-card-actions>

        <span class="md-body-1">Already have an account? </span>

        <router-link to="/login"> Log in</router-link>

        <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar>
      </form>
    </md-content>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'register',
  mixins: [validationMixin],
  data: () => ({
    form: {
      fullName: null,
      dateOfBirth: null,
      gender: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      fullName: {
        required,
        minLength: minLength(3),
      },
      dateOfBirth: {
        required,
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password'),
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
      this.form.fullName = null;
      this.form.gender = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.fullName}`;
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
    margin-bottom: 30px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 500px;
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
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
