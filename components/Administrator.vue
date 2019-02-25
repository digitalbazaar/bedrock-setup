<template>
  <form class="column items-center width-100">
    <input-box v-model="email.value" :change="debounceEmail(email.value)"
    :type="'text'" :invalid="$v.email.value.$invalid" :error="email.error"
    :errorMessage="email.errorMessage" :placeholder="inputPlaceholder.email"
    :description="inputDescription.email"></input-box>
    <input-box v-model="password.value"
    :change="debouncePassword(password.value)" @toggle="togglePassword()"
    :type="passwordToggle" :icon="true" :invalid="$v.password.value.$invalid"
    :error="password.error" :errorMessage="password.errorMessage"
    :placeholder="inputPlaceholder.password"
    :description="inputDescription.password"></input-box>
    <input-box v-model="verify.value" :change="debounceVerify(verify.value)"
    @toggle="toggleVerify()" :type="verifyToggle" :icon="true"
    :invalid="$v.verify.value.$invalid" :error="verify.error"
    :errorMessage="verify.errorMessage" :placeholder="inputPlaceholder.verify"
    :description="inputDescription.verify"></input-box>
  </form>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import InputBox from './InputBox.vue';
import {required, email, helpers} from 'vuelidate/lib/validators';
import pDebounce from 'p-debounce';

const strongPassword = helpers.regex('strongPassword',
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);

export default {
  name: 'Administrator',
  components: {InputBox},
  props: {
    value: {
      type: Object,
      required: true 
    }
  },
  data() {
    return {
      passwordToggle: 'password',
      verifyToggle: 'password',
      email: {
        value: '',
        error: false,
        errorMessage: '',
      },
      password: {
        value: '',
        error: false,
        errorMessage: '',
      },
      verify: {
        value: '',
        error: false,
        errorMessage: '',
      },
      inputPlaceholder: {
        email: 'Email',
        password: 'Password',
        verify: 'Verify Password'       
      },
      inputDescription: {
        email: 'The email address associated with this account',
        password: 'The login password for the account',
        verify: 'Verify the login password for the account'
      },
    }
  },
  created() {
    if(Object.keys(this.value).length !== 0){
      this.email = this.value.email;
      this.password = this.value.password;
      this.verify = this.value.verify;
    }
    this.$emit('blocker', true);
  },
  watch: {
    '$v.email.value.$invalid': function() {
      if(this.$v.email.value.$invalid) {
        return this.$emit('blocker', true);
      }
    },
    '$v.password.value.$invalid': function() {
      if(this.$v.password.value.$invalid) {
        return this.$emit('blocker', true);
      }
    },
    '$v.verify.value.$invalid': function() {
      if(!this.$v.verify.value.passwordsMatch) {
        return this.$emit('blocker', true);
      }
    }
  },
  methods: {
    debounceEmail: pDebounce(async function(value) {
      if(value !== '') {
        this.emailErrorCheck();
      }
    }, 500),
    debouncePassword: pDebounce(async function(value) {
      if(value !== '') {
        this.passwordErrorCheck();
      }
    }, 500),
    debounceVerify: pDebounce(async function(value) {
      if(value !== '') {
        this.verifyErrorCheck();
      }
    }, 500),
    emailErrorCheck() {
      if(this.$v.email.value.$invalid) {
        this.email.error = true;
        return this.emailError;
      }
      this.email.error = false;
      this.validateForm();
    },
    passwordErrorCheck() {
      if(this.$v.password.value.$invalid) {
        this.password.error = true;
        return this.passwordError;
      }
      this.password.error = false;
      this.validateForm();
    },
    verifyErrorCheck() {
      if(!this.$v.verify.value.passwordsMatch) {
        this.verify.error = true;
        return this.verifyError;
      }
      this.verify.error = false;
      this.validateForm();
    },
    validateForm() {
      if(!this.$v.email.value.$invalid
      && !this.$v.password.value.$invalid
      && !this.$v.verify.value.$invalid) {
        this.$emit('blocker', false)
        let adminData = {
          email: this.email,
          password: this.password,
          verify: this.verify
        }
        this.$emit('input', adminData)
      }
    },
    togglePassword() {
      if(this.passwordToggle === 'password') {
        return this.passwordToggle = 'text';
      }
      this.passwordToggle = 'password'
    },
    toggleVerify() {
      if(this.verifyToggle === 'password') {
        return this.verifyToggle = 'text'
      }
      this.verifyToggle = 'password'
    },
  },
  computed: {
    emailError() {
      if(this.$v.email.value.$invalid) {
        this.email.errorMessage = 'The email you entered is not a valid ' +
        'email address.';
      }
    },
    passwordError() {
      if(this.$v.password.value.$invalid) {
        this.password.errorMessage = 'Your password must be at least 16 ' + 
        'characters long, contain at least one number and have a mixture ' + 
        'of uppercase and lowercase letters.';
      }
    },
    verifyError() {
      if(!this.$v.verify.value.passwordsMatch) {
        this.verify.errorMessage = 'Passwords do no match.';
      }
    }
  },
  validations: {
    email: {
      value: {
        required,
        email
      }
    },
    password: {
      value: {
        required,
        strongPassword
      }
    },
    verify: {
      value: {
        required,
        passwordsMatch(value) {
          return this.password.value === this.verify.value;
        }
      }
    }  
  }
};
</script>
<style>
</style>
