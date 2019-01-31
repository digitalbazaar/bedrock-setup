<template>
  <br-wizard
    title="Welcome"
    icon="/images/stepper-welcome-icon.svg"
    heading="Welcome to the setup process for Product Name"
    subheading="The following steps will help you install the software:"
    :blockNext="blockNext"
    :steps="steps"
    @back="back($event)"
    @next="next($event)"
    @submit="submit($event)">
    <template slot="step">
      <domain
        xv-if="steps[stepIndex].name === 'Domain'"
        :storedData="domainData"
        @storeData="storeData($event, stepIndex)"
        @blocker="blocker($event)" />
      <administrator
        xv-if="step.name === 'Administrator'"
        :storedData="adminData"
        @storeData="storeData($event, stepIndex)"
        @blocker="blocker($event)" />
      <review
        xv-if="step.name === 'Review'"
        @data="getSubmitData($event)"
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

import Administrator from './Administrator.vue';
import BrWizard from './BrWizard.vue';
import Domain from './Domain.vue';
import Review from './Review.vue';

export default {
  name: 'Setup',
  components: {BrWizard, Domain, Administrator, Review},
  data() {
    return {
      blockNext: false,
      stepIndex: 0,
      domainData: {},
      adminData: {},
      reviewData: {},
      steps: [{
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
        console.log('test');

        // uncomment this to show next getting canceled!
        const error = new Error(
          'Suppose some error happened and we need to cancel next');

        // ... or use this instead because no error happened, next can proceed!
        //const error = null;
        //this.stepIndex++;

        if(error) {
          reject(error);
        } else {
          resolve();
        }
      }));
    },
    back(event) {
      console.log('back was triggered in the wizard', event);
      this.stepIndex--;
    },
    submit(event) {
      console.log('do something to submit the things!', event);
    }
  }
};

</script>
<style>
</style>
