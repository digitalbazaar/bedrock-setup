<template>
  <form class="column items-center width-100">
    <input-box @update="updateEmail($event)" :type="'text'" :value="email.value" :invalid="$v.email.value.$invalid" :error="email.error" :errorMessage="email.errorMessage" :placeholder="inputPlaceholder.email" :description="inputDescription.email"></input-box>
    <input-box @update="updatePassword($event)" @toggle="togglePassword()" :type="passwordToggle" :icon="true" :value="password.value" :invalid="$v.password.value.$invalid" :error="password.error" :errorMessage="password.errorMessage" :placeholder="inputPlaceholder.password" :description="inputDescription.password"></input-box>
    <input-box @update="updateVerify($event)" @toggle="toggleVerify()" :type="verifyToggle" :icon="true" :value="verify.value" :invalid="$v.verify.value.$invalid" :error="verify.error" :errorMessage="verify.errorMessage" :placeholder="inputPlaceholder.verify" :description="inputDescription.verify"></input-box>
  </form>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import InputBox from './InputBox.vue';
import {required, email, helpers} from 'vuelidate/lib/validators';
import bus from './bus';

const strongPassword = helpers.regex('strongPassword', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);

export default {
  name: 'Administrator',
  components: {InputBox},
  props: {
    storedData: {
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
    if(Object.keys(this.storedData).length !== 0){
      this.email = this.storedData.email;
      this.password = this.storedData.password;
      this.verify = this.storedData.verify;
    }
    bus.$on('errorCheck', () => {
      this.errorCheck();
    });
  },
  methods: {
    errorCheck() {
      if(this.$v.email.value.$invalid || this.$v.password.value.$invalid || this.$v.verify.value.$invalid) {
        if(this.$v.email.value.$invalid) {
          this.email.error = true;
        }
        if(this.$v.password.value.$invalid) {
          this.password.error = true;
        }
        if(!this.$v.verify.value.passwordsMatch) {
          this.verify.error = true;
        }
        this.$emit('blocker', true)
        return this.administratorError;
      }
      this.email.error = false;
      this.password.error = false;
      this.verify.error = false;
      this.$emit('blocker', false)
      let data = {
        email: this.email,
        password: this.password,
        verify: this.verify
      }
      this.$emit('data', data)
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
    updateEmail(value) {
      this.email.value = value;
      this.administratorError;
    },
    updatePassword(value) {
      this.password.value = value;
      this.administratorError;
    },
    updateVerify(value) {
      this.verify.value = value;
      this.administratorError;
    },
  },
  computed: {
    administratorError() {
      if(this.$v.email.value.$invalid) {
        this.email.errorMessage = 'The email you entered is not a valid email address.';
      }
      if(this.$v.password.value.$invalid) {
        this.password.errorMessage = 'Your password must be at least 16 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.';
      }
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
