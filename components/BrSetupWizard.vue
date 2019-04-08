<template>
  <br-wizard
    :current-step-index="stepIndex"
    :total-steps="steps.length"
    :block-next="blockNext"
    :block-finish="blockNext"
    @next="next($event)"
    @finish="finish($event)"
    @index="stepIndex = $event">
    <br-wizard-step
      :heading="currentStep.heading"
      :image="currentStep.image"
      :icon="currentStep.icon"
      :subheading="currentStep.subheading">
      <div class="fit steps">
        <welcome
          v-if="stepIndex === 0"
          :steps="steps" />
        <br-setup-review
          v-if="stepIndex === lastStepIndex"
          :sections="review" />
        <form v-if="currentStep.form">
          <br-q-form-generator
            ref="form"
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
      stepIndex: 0
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.stepIndex] || {};
    },
    lastStepIndex() {
      return this.steps.length - 1;
    },
    steps() {
      const {flow} = this;
      // generate default model for each flow if a model template is given
      for(const step of flow) {
        const {form} = step;
        if(!form) {
          continue;
        }
        if(form.modelTemplate) {
          try {
            form.model = {
              ...(form.model || {}),
              ...jsonata(form.modelTemplate).evaluate({window})
            };
          } catch(e) {
            console.error(`Error with form "${form.id}" model template:`, e);
            throw e;
          }
        }
      }
      return flow;
    },
    blockNext() {
      if(this.currentStep.form && this.$refs.form && this.$refs.form.$v) {
        return this.$refs.form.$v.$invalid;
      }
      return false;
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
          env: {window}
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

function applyTemplates({flow, templates, env}) {
  // 1. Merge all forms into data for the templates.
  const data = mergeFlowData({flow});
  // 2. Create template output.
  const result = {};
  for(const key in templates) {
    try {
      result[key] = jsonata(templates[key]).evaluate({...data, ...env});
    } catch(e) {
      console.error(`Error with template "${key}Template":`, e);
      throw e;
    }
  }
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
<style lang="scss" scoped>
$breakpoint-sm: 767px;
$breakpoint-xs: 320px;

@mixin mobile {
  @media (min-width: #{$breakpoint-xs}) and (max-width: #{$breakpoint-sm}) {
    @content;
  }
}

[v-cloak] {
  display: none;
}

.steps {
  @include mobile {
    padding-bottom: 16px;
  }
}
</style>
