<template>
  <div>
    <div>{{title}}</div>
    <div
      v-for="field in fields"
      :key="field.name">
      <div>{{field.name}}: {{field.value}}</div>
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'BrSetupReviewSection',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    fields: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>
<style>
</style>
