<template>
  <br-wizard
    :steps="steps"
    :blockNext="blockNext"
    :blockBack="blockBack"
    :blockFinish="blockFinish"
    @back="back($event)"
    @next="next($event)"
    @finish="finish($event)"
    @index="stepIndex = $event">
    <template slot="step">
      <welcome
        v-if="steps[stepIndex].name === 'Welcome'"
        :steps="steps"/>
      <domain
        v-if="steps[stepIndex].name === 'Domain'"
        v-model="domainData"
        @blocker="blockNext = $event"
        ref="domain" />
      <administrator
        v-if="steps[stepIndex].name === 'Administrator'"
        v-model="adminData"
        @blocker="blockNext = $event"
        ref="administrator" />
      <review
        v-if="steps[stepIndex].name === 'Review'"
        v-model="reviewData"
        :domain="domainData"
        :administrator="adminData"
        :loading="loading" />
    </template>
  </br-wizard>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';


import axios from 'axios';
import {BrWizard, Welcome} from 'bedrock-vue-wizard';
import Domain from './Domain.vue';
import Administrator from './Administrator.vue';
import Review from './Review.vue';
import {SetupService} from './SetupService.js';
import setupExample from '../setup-example.json';

export default {
  name: 'Setup',
  components: {BrWizard, Welcome, Domain, Administrator, Review},
  async mounted() {
    this.setupService = new SetupService();
    this.setupProcess = await this.setupService.get();
  },
  data() {
    return {
      blockNext: false,
      blockBack: false,
      blockFinish: false,
      loading: false,
      stepIndex: 0,
      domainData: {},
      adminData: {},
      reviewData: {},
      steps: setupExample.steps
    };
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
        console.log('ACC & KEY', acc, key)
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
          const response = await axios.get('/');
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
</style>
