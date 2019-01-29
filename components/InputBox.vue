<template>
  <div class="q-mt-md width-100">
    <div>
      <input :change="update(value)" v-model="value" type="text" placeholder="Domain" class="input-box" :class="{'error-input': invalid && error}">
      <p class="small-text text-dark-gray q-mt-xs">{{description}}</p>
    </div>
    <span v-if="invalid && error" class="error-message width-100 width-450">{{errorMessage}}</span>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'InputBox',
  props: {
    value: {
      type: String,
      required: true
    },
    invalid: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
    errorMessage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  methods: {
    update(value) {
      this.$emit('update', value);
    }
  }
};
</script>
<style>
</style>
