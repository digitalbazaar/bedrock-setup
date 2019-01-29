<template>
  <div class="column items-center width-100 q-mt-xl">
    <section class="column items-center width-100" :class="{'fadeInTop': animations.initialLoad}">
      <div v-for="(step, index) in setup.steps" v-bind:key="index" class="box-width">
        <div v-if="currentStep === index + 1" class="column items-center bg-white box-width q-pa-xl top-spacing round-borders shadow-6 overflow-hidden">
          <div class="circle absolute bg-white q-pa-lg">
            <img :src="step.icon" :class="{'fadeInIcon': animations.fadeInIcon, 'fadeOutIcon': animations.fadeOutIcon}">
          </div>
          <div class="column items-center" :class="{'slideInRight': animations.slideInRight, 'slideOutLeft': animations.slideOutLeft, 'slideInLeft': animations.slideInLeft, 'slideOutRight': animations.slideOutRight}">
            <h4 v-if="step.heading !== ''" class="text-center width-450 text-dark-gray q-mt-sm q-mb-lg">{{ step.heading }}</h4>
            <h5 v-if="step.subheading !== ''" class="text-center text-dark-gray q-mt-sm q-mb-sm width-450 width-250-mobile">{{ step.subheading }}</h5>
            
            <!-- Specific Component Data -->
            <welcome v-if="step.name === 'Welcome'"></welcome>
            <domain v-if="step.name === 'Domain'"></domain>

            <div class="row justify-center width-100 q-mt-lg">
              <back-button v-if="index + 1 !== 1" @back="back()" class="q-ml-md q-mr-md"></back-button>
              <next-button v-if="index + 1 !== setup.steps.length" @next="next()" class="q-ml-md q-mr-md"></next-button>
              <submit-button v-if="index + 1 === setup.steps.length" @submit="submit()" class="q-ml-md q-mr-md"></submit-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <step-progress :currentStep="currentStep" :steps="setup.steps"></step-progress>
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import Welcome from './Welcome.vue';
import Domain from './Domain.vue';
import AdministratorStep from './AdministratorStep.vue';
import ReviewStep from './ReviewStep.vue';
import StepProgress from './StepProgress.vue';
import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import SubmitButton from './SubmitButton.vue';
import { setTimeout } from 'timers';

export default {
  name: 'SetupWizard',
  components: {Welcome, Domain, AdministratorStep, ReviewStep, StepProgress, NextButton, BackButton, SubmitButton},
  data() {
    return {
      currentStep: 1,
      setup: {
        steps: [{
            name: 'Welcome',
            icon: '/images/stepper-welcome-icon.svg',
            heading: 'Welcome to the setup process for Product Name',
            subheading: 'The following steps will help you install the software:',
          },
          {
            name: 'Domain',
            icon: '/images/stepper-domain-icon.svg',
            heading: '',
            subheading: 'During this step, you will verify that the detected domain is appropriate',
          },
          {
            name: 'Administrator',
            icon: '',
            heading: '',
            subheading: '',
          },
          {
            name: 'Review',
            icon: '',
            heading: '',
            subheading: '',
          }]
      },
      passwordToggle: 'password',
      verifyToggle: 'password',
      passwordReveal: 'password',
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
      this.animations.slideOutLeft = true;
      this.animations.slideInLeft = false;
      this.animations.slideInRight = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.currentStep += 1;
        this.animations.slideOutLeft = false;
        this.animations.slideInRight = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300)
    },
    back() {
      this.animations.slideOutRight = true;
      this.animations.slideInRight = false;
      this.animations.slideInLeft = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.currentStep -= 1;
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
