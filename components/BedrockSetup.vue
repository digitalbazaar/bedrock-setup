<template>
  <q-stepper ref="stepper">
    <q-step v-for="(step, index) in setupProcess.steps" :title="step.title"
      style="max-width: 600px">
      {{step.description}}

      <domain-input v-if="step.stepType === 'DomainInput'"
        v-model="domain"></domain-input>
      <account-input v-else-if="step.stepType === 'AccountInput'"
        v-model="account"></account-input>

      <dl v-else-if="step.stepType === 'Review'"
        class="horizontal">
          <dt>Domain</dt>
          <dd>{{domain}}</dd>
          <dt>Administrator</dt>
          <dd>{{account.email}}</dd>
          <dt>Password</dt>
          <dd><q-input type="password" v-model="account.password"/></dd>
      </dl>

      <q-stepper-navigation>
        <q-btn v-if="index > 0 && index !== setupProcess.steps.length - 1"
          color="secondary" flat @click="$refs.stepper.previous()" label="Back" />
        <q-btn v-if="index !== setupProcess.steps.length - 1"
          color="secondary" @click="$refs.stepper.next()" label="Next" />
        <q-btn v-if="index === setupProcess.steps.length - 1"
          color="secondary" @click="apply()" label="Apply" />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import AccountInput from './AccountInput.vue';
import DomainInput from './DomainInput.vue';

export default {
  name: 'BedrockSetup',
  components: {DomainInput, AccountInput},
  mounted() {
    this.setupProcess = {
      product: 'Veres Wallet',
      steps: [{
        title: 'Welcome',
        image: 'logo.png',
        description: 'Welcome to the setup process for Veres Wallet. ' +
          'The following steps will help you install the software. ' +
          'Click next to continue.',
        stepType: 'Message'
      },
      {
        title: 'Domain',
        description: 'During this step, you will verify that the detected ' +
          'domain is appropriate.',
        stepType: 'DomainInput',
        outputPrefix: 'domain'
      },
      {
        title: 'Administrator',
        description: 'This step is used to configure the administrator ' +
          'account for this system.',
        stepType: 'AccountInput',
        outputPrefix: 'admin'
      },
      {
        title: 'Review',
        description: 'Please review the information you entered and click ' +
          'Apply to complete the setup process.',
        stepType: 'Review'
      }]
    };
  },
  data() {
    return {
      setupProcess: {
        steps: []
      },
      domain: '',
      account: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    getSetupProcess() {
      console.log("GET SETUP");
    },
    apply() {
      console.log("APPLY");
    }
  }
};
</script>
<style>
</style>
