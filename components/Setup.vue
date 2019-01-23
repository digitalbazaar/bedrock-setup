<template>
  <q-stepper ref="stepper">
    <q-step v-for="(step, index) in setupProcess.steps"
      :title="step.title" style="max-width: 600px">
      {{step.description}}

      <domain-input v-if="step.stepType === 'DomainInput'"
        v-model="config" :title="step.title" :outputPrefix="step.outputPrefix">
      </domain-input>
      <account-input v-else-if="step.stepType === 'AccountInput'"
        v-model="config" :title="step.title" :outputPrefix="step.outputPrefix">
      </account-input>
      <review v-else-if="step.stepType === 'Review'" :config="config"></review>

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
import Review from './Review.vue';
import {SetupService} from './SetupService.js';
import Quasar from 'quasar-framework';
const {components: {QSpinnerGears}} = Quasar;

export default {
  name: 'Setup',
  components: {DomainInput, AccountInput, Review},
  async mounted() {
    this.setupService = new SetupService();
    this.setupProcess = await this.setupService.get();
  },
  data() {
    return {
      setupProcess: {steps: []},
      config: {}
    };
  },
  methods: {
    apply() {
      // generate the flat config by processing the output of the setup process
      const flatConfig = Object.keys(this.config).reduce((acc, key) => {
        return {
          ...acc,
          [key]: this.config[key].value
        };
      }, {});
      this.setupService.store(flatConfig);
      console.log("QSG", QSpinnerGears);
      this.$q.loading.show({
        spinner: QSpinnerGears,
        message: `${this.setupProcess.product} is being configured. ` +
          'This may take a few minutes.',
        spinnerSize: 250
      });
    }
  }
};
</script>
<style>
</style>
