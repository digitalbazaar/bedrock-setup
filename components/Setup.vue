<template>
  <br-wizard
    :steps="steps"
    :blockNext="blockNext"
    @back="back($event)"
    @next="next($event)"
    @submit="submit($event)"
    @index="stepIndex = $event">
    <template slot="step">
      <welcome
        v-if="steps[stepIndex].name === 'Welcome'"
        :steps="steps"/>
      <domain
        v-if="steps[stepIndex].name === 'Domain'"
        :storedData="domainData"
        @data="domainData = $event"
        @blocker="blockNext = $event"
        ref="domain" />
      <administrator
        v-if="steps[stepIndex].name === 'Administrator'"
        :storedData="adminData"
        @data="adminData = $event"
        @blocker="blockNext = $event"
        ref="administrator" />
      <review
        v-if="steps[stepIndex].name === 'Review'"
        @data="reviewData = $event"
        :domain="domainData"
        :administrator="adminData" />
    </template>
  </br-wizard>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrWizard, Welcome} from 'bedrock-vue-wizard';
import Domain from './Domain.vue';
import Administrator from './Administrator.vue';
import Review from './Review.vue';

export default {
  name: 'Setup',
  components: {BrWizard, Welcome, Domain, Administrator, Review},
  data() {
    return {
      blockNext: false,
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
      event.waitUntil(new Promise((resolve, reject) => {
        // do whatever, like error checking
        // ...
        // console.log('test');
        const error = '';

        if(this.steps[this.stepIndex].name === 'Domain') {
          this.$refs.domain.errorCheck();
        }
        if(this.steps[this.stepIndex].name === 'Administrator') {
          this.$refs.administrator.errorCheck();
        }

        // uncomment this to show next getting canceled!
        if(this.blockNext) {
          console.log('Blocked')
          this.error = new Error(
          'Error Check Failed');
          reject(error);
        } else {
          // ... or use this instead because no error happened, next can proceed!
          console.log('Passed')
          this.error = null;
          resolve();
        }
      }));
    },
    back(event) {
      console.log('back was triggered in the wizard', event);
      this.blockNext = false;
    },
    submit(event) {
      console.log('do something to submit the things!', event);
      console.log('SUBMIT', this.reviewData);
    },
  }
};

</script>
<style>
</style>
