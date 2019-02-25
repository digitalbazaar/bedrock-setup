<template>
  <span @click="toggle()" :class="{'hide-password': type === 'password', 
  'show-password': type === 'text'}"></span>
  <!-- <span @click="toggle()" :class="type"></span> -->
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'PasswordToggleButton',
  props: {
    type: {
      type: Boolean,
      required: true 
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
};
</script>
<style>
</style>
