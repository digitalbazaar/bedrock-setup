<template>
  <div>
  <q-field
    label="Email"
    helper="The email address associated with this account"
    :error="$v.email.$error"
    error-label="You must enter a valid email address"
  >
    <q-input
      type="email"
      v-model="email"
      @blur="$v.email.$touch"
    />
  </q-field>
  <q-field
    label="Password"
    helper="The login password for the account"
    :error="$v.password.$error"
    error-label="You must enter a secure password"
  >
    <q-input
      type="password"
      v-model="password"
      @blur="$v.password.$touch"
      @input="updateValue()"
    />
  </q-field>
  <q-field
    label="Verify"
    helper="Verify the login password for the account"
    :error="$v.passwordVerification.$error"
    error-label="Your passwords don't match"
  >
    <q-input
      type="password"
      v-model="passwordVerification"
      @blur="$v.passwordVerification.$touch"
      @input="updateValue()"
    />
  </q-field>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {required, email, helpers} from 'vuelidate/lib/validators';

const strongPassword = helpers.regex('strongPassword',
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);

export default {
  name: 'AccountInput',
  props: ['value', 'title', 'outputPrefix'],
  methods: {
    updateValue() {
      this.$emit('input', {
        ...this.value,
        [this.outputPrefix + '_email']: {
          title: this.title,
          value: this.email
        },
        [this.outputPrefix + '_password']: {
          title: this.title + ' Password',
          value: this.password,
          hidden: true
        }
      });
    }
  },
  data() {
    return {
      email: '',
      password: '',
      passwordVerification: ''
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      strongPassword
    },
    passwordVerification: {
      required,
      passwordsMatch(value) {
        return this.password === this.passwordVerification;
      }
    }
  }
};
</script>
<style>
</style>
