<template>
  <br-wizard
    :steps="steps"
    :blockNext="blockNext"
    @back="back($event)"
    @next="next($event)"
    @finish="submit($event)"
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
        :submitted="submitted" />
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
      submitted: false,
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
    submit(event) {
      console.log('do something to submit the things!', event);
      console.log('SUBMIT', this.reviewData);
      this.submitted = true;
    },
  }
};

</script>
<style>
</style>
