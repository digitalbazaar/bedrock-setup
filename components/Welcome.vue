<template>
  <ul class="list q-mb-none q-mt-none">
    <h5 v-for="(step, index) in steps.slice(1)" :key="index" class="q-mt-xs q-mb-xs">{{index + 1}}. {{step.name}}</h5>
  </ul>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'Welcome',
  props: {
    steps: {
      type: Array,
      required: true
    }
  }
};
</script>
<style>
</style>
