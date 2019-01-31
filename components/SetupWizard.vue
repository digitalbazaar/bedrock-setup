<template>
  <div class="column items-center width-100 q-mt-xl">
    <section class="column items-center width-100" :class="{'fadeInTop': animations.initialLoad}">
      <div v-for="(step, index) in setup.steps" v-bind:key="index" class="box-width">
        <div v-if="currentStep === index + 1" class="column items-center bg-white box-width q-pa-xl top-spacing round-borders shadow-6 overflow-hidden">
          <div class="circle absolute bg-white q-pa-lg">
            <img :src="step.icon" :class="{'fadeInIcon': animations.fadeInIcon, 'fadeOutIcon': animations.fadeOutIcon}">
          </div>
          <div class="column items-center width-450" :class="{'slideInRight': animations.slideInRight, 'slideOutLeft': animations.slideOutLeft, 'slideInLeft': animations.slideInLeft, 'slideOutRight': animations.slideOutRight}">
            <h4 v-if="step.heading !== ''" class="text-center q-mt-sm q-mb-sm">{{ step.heading }}</h4>
            <h5 v-if="step.subheading !== ''" class="text-center q-mt-lg q-mb-lg width-250-mobile">{{ step.subheading }}</h5>
            
            <!-- Specific Component Data -->
            <welcome v-if="step.name === 'Welcome'"></welcome>
            <domain v-if="step.name === 'Domain'" :storedData="setup.steps[index].storedData" @storeData="storeData($event, index)" @blocker="blocker($event)"></domain>
            <administrator v-if="step.name === 'Administrator'" :storedData="setup.steps[index].storedData" @storeData="storeData($event, index)" @blocker="blocker($event)"></administrator>
            <review v-if="step.name === 'Review'" @data="getSubmitData($event)" :domain="setup.steps[1].storedData" :administrator="setup.steps[2].storedData"></review>

            <div class="row justify-center width-100 q-mt-lg">
              <back-button v-if="index + 1 !== 1" @back="back()" class="q-mr-md"></back-button>
              <next-button v-if="index + 1 !== setup.steps.length" @next="next()" :class="{'q-ml-md': index + 1 !== 1}"></next-button>
              <submit-button v-if="index + 1 === setup.steps.length" @submit="submit()" class="q-ml-md"></submit-button>
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
import Administrator from './Administrator.vue';
import Review from './Review.vue';
import StepProgress from './StepProgress.vue';
import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import SubmitButton from './SubmitButton.vue';
import { setTimeout } from 'timers';

import bus from './bus';

export default {
  name: 'SetupWizard',
  components: {Welcome, Domain, Administrator, Review, StepProgress, NextButton, BackButton, SubmitButton},
  data() {
    return {
      currentStep: 1,
      setup: {
        steps: [{
            name: 'Welcome',
            icon: '/images/stepper-welcome-icon.svg',
            heading: 'Welcome to the setup process for Product Name',
            subheading: 'The following steps will help you install the software:',
            storedData: {}
          },
          {
            name: 'Domain',
            icon: '/images/stepper-domain-icon.svg',
            heading: '',
            subheading: 'During this step, you will verify that the detected domain is appropriate',
            storedData: {}
          },
          {
            name: 'Administrator',
            icon: '/images/stepper-person-icon.svg',
            heading: '',
            subheading: 'This step is used to configure the administrator account for this system',
            storedData: {}
          },
          {
            name: 'Review',
            icon: '/images/stepper-review-icon.svg',
            heading: '',
            subheading: 'Please review the information you entered and then complete the setup process',
            storedData: {}
          }]
      },
      blocked: false,
      storedData: {},
      submitData: '',
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
      bus.$emit('errorCheck');
      if(this.blocked) {
        return
      }
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
      this.blocked = false;
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
    storeData(data, index) {
      this.setup.steps[index].storedData = data;
    },
    submit() {
      console.log('Submit', this.submitData);
    },
    getSubmitData(data) {
      this.submitData = data;
    },
    blocker(data) {
      this.blocked = data;
    }
  }
};
</script>
<style>
</style>
