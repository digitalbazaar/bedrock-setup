<template>
  <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width">Back</q-btn>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'NextButton',
  methods: {
    back() {
      this.$emit('back')
    }
  }
};
</script>
<style>
</style>
