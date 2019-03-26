<template>
  <br-wizard
    :current-step-index="stepIndex"
    :total-steps="steps.length"
    @next="next($event)"
    @finish="finish($event)"
    @index="stepIndex = $event">
    <br-wizard-step
      :heading="currentStep.heading"
      :image="currentStep.image"
      :icon="currentStep.icon"
      :subheading="currentStep.subheading">
      <div class="q-pb-xl fit">
        <welcome
          v-if="stepIndex === 0"
          :steps="steps" />
        <br-setup-review
          v-if="stepIndex === lastStepIndex"
          :sections="review" />
        <form v-if="currentStep.form">
          <br-q-form-generator
            v-model="currentStep.form.model"
            :vocab="vocab"
            :schema="currentStep.form.schema" />
        </form>
      </div>
    </br-wizard-step>
  </br-wizard>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrSetupReview from './BrSetupReview.vue';
import {BrQFormGenerator} from 'bedrock-quasar-form-generator';
import {BrWizard, BrWizardStep, Welcome} from 'bedrock-vue-wizard';
import jsonata from 'jsonata';

export default {
  name: 'Setup',
  components: {
    BrQFormGenerator,
    BrSetupReview,
    BrWizard,
    BrWizardStep,
    Welcome},
  props: {
    flow: {
      type: Array,
      default: () => [],
      required: true
    },
    vocab: {
      type: Object,
      default: () => ({}),
      required: true
    },
    configTemplate: {
      type: String,
      default: '',
      required: true
    },
    reviewTemplate: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      config: {},
      review: [],
      stepIndex: 0,
      welcomeStep: {
        icon: {
          name: 'fas fa-walking',
          size: '65px',
          color: 'primary'
        },
        heading: 'Welcome to the setup process for PRODUCT',
        subheading: 'The following steps will help you install the software:',
        name: 'Introduction'
      },
      reviewStep: {
        icon: {
          name: 'fas fa-check-circle',
          size: '65px',
          color: 'primary'
        },
        heading: '',
        subheading: 'Please review the information you entered and then ' +
          'click "Finish" to complete the setup process.',
        name: 'Review'
      }
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.stepIndex];
    },
    lastStepIndex() {
      return this.steps.length - 1;
    },
    steps() {
      return [this.welcomeStep, ...this.flow, this.reviewStep];
    }
  },
  methods: {
    next() {
      if(this.stepIndex + 1 === this.lastStepIndex) {
        // apply templates for review and config
        const {flow, configTemplate, reviewTemplate} = this;
        const {config, review} = applyTemplates({
          flow,
          templates: {config: configTemplate, review: reviewTemplate},
          // FIXME: expose full window or just `location` or what?
          constants: {window}
        });
        this.config = config;
        this.review = review;
      }
    },
    async finish(event) {
      // propagate cancelable finish event
      let promise = Promise.resolve();
      this.$emit('finish', {
        config: this.config,
        waitUntil: p => promise = p
      });
      event.waitUntil(promise);
    }
  }
};

function applyTemplates({flow, templates, constants}) {
  // 1. Merge all forms into data for the templates.
  const data = mergeFlowData({flow});
  // 2. Create template output.
  const result = {};
  for(const key in templates) {
    result[key] = jsonata(templates[key]).evaluate({...data, constants});
  }
  console.log('result', result);
  return result;
}

function mergeFlowData({flow}) {
  // merge all forms into data for a template
  return flow
    .filter(({form}) => form)
    .map(({form}) => ({[form.id]: form.model}))
    .reduce((acc, data) => ({...acc, ...data}), {});
}

</script>
<style>
[v-cloak] {
  display: none;
}
</style>
