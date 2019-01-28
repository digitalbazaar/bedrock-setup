<template>
  <div class="dot fadeInBottom">
    <ul class="list">
      <li v-bind:class="{ 'is-active': step === 1 }"></li>
      <li v-bind:class="{ 'is-active': step === 2 }"></li>
      <li v-bind:class="{ 'is-active': step === 3 }"></li>
      <li v-bind:class="{ 'is-active': step === 4 }"></li>
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
    step: {
      type: Number,
      required: true
    },
  }
};
</script>
<style>
</style>
