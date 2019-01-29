<template>
  <q-btn @click="submit()" class="bg-red-main text-white btn-width">Submit</q-btn>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'SubmitButton',
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
};
</script>
<style>
</style>
