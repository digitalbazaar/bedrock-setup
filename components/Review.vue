<template>
  <div width-100>
    <div class="row justify-center width-100 wrap items-center">
      <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Domain:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{domain.domain.value}}</h5>
    </div>
    <div class="row justify-center width-100 wrap items-center">
      <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Administrator:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{administrator.email.value}}</h5>
    </div>
    <div class="row justify-center width-100">
      <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Password:</h5><input @click="revealPassword()" :type="passwordReveal" :value="administrator.password.value" readonly class="col read-input">
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'Review',
  props: {
    step: {
      type: Number,
      required: true
    },
    animations: {
      type: Object,
      required: true,
    },
    domain: {
      type: Object,
      required: true,
    },
    administrator: {
      type: Object,
      required: true,
    },
  },
  created() {
    let data = {
      domain: this.domain.domain.value,
      email: this.administrator.email.value,
      password: this.administrator.password.value,
    };
    this.$emit('data', data);
  },
  data() {
    return {
      passwordReveal: 'password'
    }
  },
  methods: {
    revealPassword() {
      if(this.passwordReveal === 'password') {
        return this.passwordReveal = 'text'
      }
      this.passwordReveal = 'password'
    }
  },
};
</script>
<style>
</style>
