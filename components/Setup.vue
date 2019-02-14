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
      steps: [{
        name: 'Welcome',
        icon: '/images/stepper-welcome-icon.svg',
        heading: 'Welcome to the setup process for Product Name',
        subheading: 'The following steps will help you install the software:'
      }, {
        name: 'Domain',
        icon: '/images/stepper-domain-icon.svg',
        heading: '',
        subheading: 'During this step, you will verify that the detected ' +
          'domain is appropriate'
      }, {
        name: 'Administrator',
        icon: '/images/stepper-person-icon.svg',
        heading: '',
        subheading: 'This step is used to configure the administrator ' +
          'account for this system'
      }, {
        name: 'Review',
        icon: '/images/stepper-review-icon.svg',
        heading: '',
        subheading: 'Please review the information you entered and then ' +
          'complete the setup process'
      }]
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
