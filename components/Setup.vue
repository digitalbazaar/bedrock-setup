<template>
  <br-wizard
    v-if="setupLoader === false"
    :block-next="blockNext"
    :block-back="blockBack"
    :block-finish="blockFinish"
    :current-step-index="stepIndex"
    :total-steps="setupProcess.steps.length"
    @back="back($event)"
    @next="next($event)"
    @finish="finish($event)"
    @index="stepIndex = $event">
    <br-wizard-step
      :heading="currentStep.heading"
      :image="currentStep.image"
      :icon="currentStep.icon"
      :subheading="currentStep.subheading">
      <welcome
        v-if="setupProcess.steps[stepIndex].name === 'Welcome'"
        :steps="setupProcess.steps" />
      <domain
        v-if="setupProcess.steps[stepIndex].name === 'Domain'"
        ref="domain"
        v-model="domainData"
        @blocker="blockNext = $event" />
      <administrator
        v-if="setupProcess.steps[stepIndex].name === 'Administrator'"
        ref="administrator"
        v-model="adminData"
        @blocker="blockNext = $event" />
      <review
        v-if="setupProcess.steps[stepIndex].name === 'Review'"
        v-model="reviewData"
        :domain="domainData"
        :administrator="adminData"
        :loading="loading" />
    </br-wizard-step>
  </br-wizard>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrWizard, BrWizardStep, Welcome} from 'bedrock-vue-wizard';
import Domain from './Domain.vue';
import Administrator from './Administrator.vue';
import Review from './Review.vue';
import {SetupService} from './SetupService.js';

export default {
  name: 'Setup',
  components: {BrWizard, BrWizardStep, Welcome, Domain, Administrator, Review},
  data() {
    return {
      blockNext: false,
      blockBack: false,
      blockFinish: false,
      loading: false,
      setupLoader: true,
      stepIndex: 0,
      domainData: {},
      adminData: {},
      reviewData: {},
      setupProcess: {
        product: '',
        steps: {}
      }
    };
  },
  computed: {
    currentStep() {
      return this.setupProcess.steps[this.stepIndex];
    }
  },
  async created() {
    this.setupService = new SetupService();
    this.setupProcess = await this.setupService.get();
    this.setupLoader = false;
  },
  methods: {
    next(event) {
      console.log('next was triggered in the wizard', event);
    },
    back(event) {
      console.log('back was triggered in the wizard', event);
      this.blockNext = false;
    },
    finish(event) {
      console.log('do something to submit the things!', event);
      console.log('SUBMIT', this.reviewData);
      const flatConfig = Object.keys(this.reviewData).reduce((acc, key) => {
        return {
          ...acc,
          [key]: this.reviewData[key].value
        };
      }, {});
      this.setupService.store(flatConfig);
      this.loading = true;
      this.blockBack = true;
      this.blockFinish = true;
      this.refreshAfterRestart();
    },
    refreshAfterRestart() {
      setTimeout(async () => {
        try {
          window.location.replace(window.location);
        } catch(err) {
          this.refreshAfterRestart();
        }
      }, 3000);
    }
  }
};

</script>
<style>
[v-cloak] {
  display: none;
}
</style>
