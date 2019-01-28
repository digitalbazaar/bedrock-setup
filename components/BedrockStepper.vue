<template>
  <div class="column items-center width-100 q-mt-xl">
    <welcome-step @next="next()" :step="step" :animations="animations"></welcome-step>
    <domain-step @next="next()" @back="back()" :step="step" :animations="animations" :domain="domain"></domain-step>
    <administrator-step @next="next()" @back="back()" :step="step" :animations="animations" :administrator="administrator" :passwordToggle="passwordToggle" :verifyToggle="verifyToggle"></administrator-step>
    <review-step @submit="submit()" @back="back()" :step="step" :animations="animations" :administrator="administrator" :domain="domain" :passwordReveal="passwordReveal"></review-step>
    <step-progress :step="step"></step-progress>
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import WelcomeStep from './WelcomeStep.vue';
import DomainStep from './DomainStep.vue';
import AdministratorStep from './AdministratorStep.vue';
import ReviewStep from './ReviewStep.vue';
import StepProgress from './StepProgress.vue';
import { setTimeout } from 'timers';

export default {
  name: 'BedrockStepper',
  components: {WelcomeStep, DomainStep, AdministratorStep, ReviewStep, StepProgress},
  data() {
    return {
      step: 1,
      passwordToggle: 'password',
      verifyToggle: 'password',
      passwordReveal: 'password',
      domain: {
        value: '',
        error: false,
        errorMessage: '',
      },
      administrator: {
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
      },
      apply: {},
      animations: {
        initialLoad: true,
        slideInRight: false,
        slideInLeft: false,
        slideOutRight: false,
        slideOutLeft: false,
        fadeInIcon: false,
        fadeOutIcon: false
      }
    };
  },
  methods: {
    next() {   
      this.animations.slideOutLeft = true,
      this.animations.slideInLeft = false,
      this.animations.fadeOutIcon = true,
      this.animations.fadeInIcon = false,
      setTimeout(() => {
        this.step += 1;
        this.animations.slideOutLeft = false;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300)
    },
    back() {
      this.animations.slideOutRight = true;
      this.animations.slideInLeft = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.step -= 1;
        this.animations.slideOutRight = false;
        this.animations.slideInLeft = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300)
    },
    submit() {
      this.apply = {
        domain: this.domain.value,
        email: this.administrator.email.value,
        password: this.administrator.password.value
      }
      console.log('Submit', this.apply);
    },
  }
};
</script>
<style>
</style>
