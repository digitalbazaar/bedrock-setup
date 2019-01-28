<template>
  <section v-if="step === 3" class="column items-center width-100">
    <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
      <div class="circle absolute bg-white q-pa-lg">
        <img src="/images/stepper-person-icon.svg" :class="{'fadeInIcon': animations.fadeInIcon, 'fadeOutIcon': animations.fadeOutIcon}">
      </div>
      <form  :class="{'slideInRight': step === 3, 'slideOutLeft': animations.slideOutLeft, 'slideInLeft': animations.slideInLeft, 'slideOutRight': animations.slideOutRight}">
        <div class="column items-center">
          <h5 class="text-center width-450 text-dark-gray q-mt-md q-mb-md">This step is used to configure the administrator account for this system</h5>
          <div class="width-100">
            <input v-model="administrator.email.value" type="email" placeholder="Email" required class="input-box" :class="{'error-input': $v.administrator.email.value.$invalid && administrator.email.error}">
            <p class="small-text text-dark-gray q-mt-xs">The email address associated with this account</p>
          </div>
          <span v-if="$v.administrator.email.value.$invalid && administrator.email.error" class="error-message width-100 width-450 q-mb-md">{{administrator.email.errorMessage}}</span>
          <div class="width-100">
            <div class="no-wrap">
              <input v-model="administrator.password.value" :type="passwordToggle" placeholder="Password" required class="input-box input-icon" :class="{'error-input': $v.administrator.password.value.$invalid && administrator.password.error}"><span @click="togglePassword()" :class="{'hide-password': passwordToggle === 'password', 'show-password': passwordToggle === 'text'}"></span>
            </div>
            <p class="small-text text-dark-gray q-mt-xs">The login password for the account</p>
          </div>
          <span v-if="$v.administrator.password.value.$invalid && administrator.password.error" class="error-message width-100 width-450 q-mb-md">{{administrator.password.errorMessage}}</span>
          <div class="width-100">
            <input v-model="administrator.verify.value" :type="verifyToggle" placeholder="Verify" required class="input-box input-icon" :class="{'error-input': $v.administrator.verify.value.$invalid && administrator.verify.error}"><span @click="toggleVerify()" :class="{'hide-password': verifyToggle === 'password', 'show-password': verifyToggle === 'text'}"></span>
            <p class="small-text text-dark-gray q-mt-xs">Verify the login password for the account</p>
          </div>
          <span v-if="$v.administrator.verify.value.$invalid && administrator.verify.error" class="error-message width-100 width-450 q-mb-md">{{administrator.verify.errorMessage}}</span>
        </div>
        <div class="row justify-between">
          <back-button @back="back()"></back-button>
          <next-button @next="next()"></next-button>
        </div>
      </form> 
    </div>
  </section>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import {required, email, helpers} from 'vuelidate/lib/validators';

const strongPassword = helpers.regex('strongPassword', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);

export default {
  name: 'AdministratorStep',
  components: {NextButton, BackButton},
  props: {
    step: {
      type: Number,
      required: true
    },
    animations: {
      type: Object,
      required: true,
    },
    administrator: {
      type: Object,
      required: true,
    },
    passwordToggle: {
      type: String,
      required: true,     
    },
    verifyToggle: {
      type: String,
      required: true,     
    }
  },
  methods: {
    next() {
      if(this.$v.administrator.email.value.$invalid || this.$v.administrator.password.value.$invalid || this.$v.administrator.verify.value.$invalid) {
        return this.administratorError;
      }
      this.administrator.email.error = false;
      this.administrator.password.error = false;
      this.administrator.verify.error = false;
      this.$emit('next')
    },
    back() {
      this.$emit('back')
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
    }
  },
  computed: {
    administratorError() {
      if(this.$v.administrator.email.value.$invalid) {
        this.administrator.email.errorMessage = 'The email you entered is not a valid email address.';
        this.administrator.email.error = true;
      }
      if(this.$v.administrator.password.value.$invalid) {
        this.administrator.password.errorMessage = 'Your password must be at least 16 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.';
        this.administrator.password.error = true;
      }
      if(!this.$v.administrator.verify.value.passwordsMatch) {
        this.administrator.verify.errorMessage = 'Passwords do no match.';
        this.administrator.verify.error = true;
      }
    }
  },
  validations: {
    administrator: {
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
            return this.administrator.password.value === this.administrator.verify.value;
          }
        }
      } 
    }
  }
};
</script>
<style>
</style>
