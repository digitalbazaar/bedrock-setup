<template>
  <section v-if="step === 1" class="column items-center width-100" :class="{'fadeInTop': animations.initialLoad}">
    <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
      <div class="circle absolute bg-white q-pa-lg">
        <img src="/images/stepper-welcome-icon.svg" :class="{'fadeInIcon': animations.fadeInIcon, 'fadeOutIcon': animations.fadeOutIcon}">
      </div>
      <div class="column items-center" :class="{'slideOutLeft': animations.slideOutLeft, 'slideInLeft': animations.slideInLeft}">
        <h4 class="text-center width-450 text-dark-gray">Welcome to the setup process for Product Name</h4>
        <h5 class="text-center text-dark-gray q-mt-sm q-mb-sm width-250-mobile">The following steps will help you install the software:</h5>
        <ul class="text-dark-gray list">
          <h5 class="q-mt-xs q-mb-xs">1. Domain Setup</h5>
          <h5 class="q-mt-xs q-mb-xs">2. Administrator Setup</h5>
          <h5 class="q-mt-xs q-mb-xs">3. Review</h5>
        </ul>
        <div class="row justify-center width-100">
          <next-button @next="next()"></next-button>
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

import NextButton from './NextButton.vue';

export default {
  name: 'WelcomeStep',
  components: {NextButton},
  props: {
    step: {
      type: Number,
      required: true
    },
    animations: {
      type: Object,
      required: true,
    }
  },
  methods: {
    next() {
      this.animations.initialLoad = false;
      this.$emit('next')
    }
  },
};
</script>
<style>
</style>
