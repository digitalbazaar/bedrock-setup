<template>
  <section v-if="step === 4" class="column items-center width-100">
    <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
      <div class="circle absolute bg-white q-pa-lg">
        <img src="/images/stepper-review-icon.svg" :class="{'fadeInIcon': animations.fadeInIcon, 'fadeOutIcon': animations.fadeOutIcon}">
      </div>
      <div :class="{'slideInRight': step === 4, 'slideOutLeft': animations.slideOutLeft, 'slideOutRight': animations.slideOutRight}">
        <div class="column items-center">
          <h5 class="text-center width-450 text-dark-gray">Please review the information you entered and then complete the setup process</h5>
          <div class="row justify-center width-100 wrap items-center">
            <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Domain:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{domain.value}}</h5>
          </div>
          <div class="row justify-center width-100 wrap items-center">
            <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Administrator:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{administrator.email.value}}</h5>
          </div>
          <div class="row justify-center width-100">
            <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Password:</h5><input @click="revealPassword()" :type="passwordReveal" :value="administrator.password.value" readonly class="col read-input">
          </div>
        </div>
        <div class="row justify-between">
          <back-button @back="back()" class="q-mt-xl"></back-button>
          <q-btn @click="submit()" class="bg-red-main text-white btn-width q-mt-xl">Apply</q-btn>
        </div>
      </div> 
    </div>
  </section>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BackButton from './BackButton.vue';

export default {
  name: 'ReviewStep',
  components: {BackButton},
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
    passwordReveal: {
      type: String,
      required: true,     
    },
  },
  methods: {
    back() {
      this.$emit('back')
    },
    submit() {
      this.$emit('submit')
    },
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
