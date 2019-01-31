<template>
  <div class="column items-center width-100 q-mt-xl">
    <section class="column items-center width-100"
      :class="{'fadeInTop': animations.initialLoad}">
      <div v-if="currentStep" class="box-width">
        <div class="column items-center bg-white box-width q-pa-xl
          top-spacing round-borders shadow-6 overflow-hidden">
          <div class="circle absolute bg-white q-pa-lg">
            <img
              :src="currentStep.icon"
              :class="{
                'fadeInIcon': animations.fadeInIcon,
                'fadeOutIcon': animations.fadeOutIcon
              }">
          </div>
          <div class="column items-center width-450"
            :class="{
              'slideInRight': animations.slideInRight,
              'slideOutLeft': animations.slideOutLeft,
              'slideInLeft': animations.slideInLeft,
              'slideOutRight': animations.slideOutRight
            }">
            <h4 v-if="currentStep.heading !== ''"
              class="text-center q-mt-sm q-mb-sm">
              {{currentStep.heading}}
            </h4>
            <h5 v-if="currentStep.subheading !== ''"
              class="text-center q-mt-lg q-mb-lg">
              {{currentStep.subheading}}
            </h5>

            <welcome v-if="currentStep === welcomeStep" :steps="steps" />
            <!-- Custom Step Slot -->
            <slot v-else name="step"></slot>

            <div class="row justify-center width-100 q-mt-lg">
              <back-button
                v-if="currentStepIndex > 0"
                @back="onBack()"
                class="q-mr-md" />
              <next-button
                v-if="currentStepIndex < steps.length - 1"
                :class="{'q-ml-md': currentStepIndex > 0}"
                @next="onNext()" />
              <submit-button
                v-if="currentStepIndex === steps.length - 1"
                class="q-ml-md"
                @submit="onSubmit()" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <step-progress :currentStep="currentStepIndex + 1" :steps="steps" />
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import Welcome from './Welcome.vue';
import StepProgress from './StepProgress.vue';
import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import SubmitButton from './SubmitButton.vue';
import {setTimeout} from 'timers';

export default {
  name: 'BrWizard',
  components: {Welcome, StepProgress, NextButton, BackButton, SubmitButton},
  mounted() {
    this.welcomeStep = this.currentStep = {
      name: this.title,
      icon: this.icon,
      heading: this.heading,
      subheading: this.subheading
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    blockNext: {
      type: Boolean,
      default: false
    },
    description: {
      type: Object,
      required: true
    },
    heading: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    steps: {
      type: Array,
      required: true
    },
    subheading: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      welcomeStep: null,
      currentStepIndex: -1,
      currentStep: null,
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
    async onNext() {
      if(!await this._emitCancelableEvent('next', {
        currentStep: this.currentStep,
        currentStepIndex: this.currentStepIndex
      })) {
        console.log('next was canceled!');
        return;
      }
      console.log('next is ok!');
      this.animations.slideOutLeft = true;
      this.animations.slideInLeft = false;
      this.animations.slideInRight = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.currentStep = this.steps[++this.currentStepIndex];
        this.animations.slideOutLeft = false;
        this.animations.slideInRight = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300);
    },
    async onBack() {
      if(!await this._emitCancelableEvent('back', {
        currentStep: this.currentStep,
        currentStepIndex: this.currentStepIndex
      })) {
        console.log('back was canceled!');
        return;
      }
      console.log('back is ok!');
      this.animations.slideOutRight = true;
      this.animations.slideInRight = false;
      this.animations.slideInLeft = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.currentStep = this.steps[--this.currentStepIndex] ||
          this.welcomeStep;
        this.animations.slideOutRight = false;
        this.animations.slideInLeft = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300);
    },
    async onSubmit() {
      if(!await this._emitCancelableEvent('submit')) {
        console.log('submit was canceled!');
        return;
      }
      console.log('submit is ok!');
    },
    async _emitCancelableEvent(name, event = {}) {
      try {
        let promise = Promise.resolve();
        this.$emit(name, {
          ...event,
          waitUntil: p => promise = p
        });
        await promise;
        // not canceled
        return true;
      } catch(e) {
        // canceled
        return false;
      }
    }
  }
};

</script>
<style>
</style>
