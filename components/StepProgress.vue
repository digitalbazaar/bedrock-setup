<template>
  <div class="dot fadeInBottom">
    <ul class="list">
      <li v-for="(step, index) in steps" v-bind:key="index" :class="{ 'is-active': currentStep === index + 1 }"></li>
    </ul>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'StepProgress',
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    steps: {
      type: Array,
      required: true
    },
  }
};
</script>
<style>
</style>
