<template>
  <div class="fit">
    <div class="column justify-center">
      <div
        v-for="section in sections"
        :key="section.title"
        class="q-my-xs full-width">
        <br-setup-review-section
          :title="section.title"
          :fields="section.fields" />
      </div>
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrSetupReviewSection from './BrSetupReviewSection.vue';

export default {
  name: 'BrSetupReview',
  components: {BrSetupReviewSection},
  props: {
    sections: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  created() {
    console.log('Sections', this.sections);
  }
};
</script>
<style>
</style>
