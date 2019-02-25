<template>
  <div class="q-mt-md q-mb-md width-100">
    <div>
      <input :change="update(value)" v-model="value" @input="typing = true" 
      :type="type" :placeholder="placeholder" class="input-box" 
      :class="{'error-input':
      invalid && error && typing === false}"><password-toggle-button 
      v-if="icon" @toggle="toggle()" :type="type"></password-toggle-button>
      <p class="small-text text-dark-gray q-mt-xs q-mb-none">{{description}}</p>
    </div>
    <div v-if="invalid && error && typing === false" 
    class="error-message width-100 q-mt-sm">{{errorMessage}}</div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import PasswordToggleButton from './PasswordToggleButton.vue';
import pDebounce from 'p-debounce';

export default {
  name: 'InputBox',
  components: {PasswordToggleButton},
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
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
    },
    placeholder: {
      type: String,
      required: true,
    },
    icon: {
      type: Boolean,
      required: false,
    }
  },
  data() {
    return {
      typing: false,
    };
  },
  watch: {
    value: pDebounce(async function() {
      this.typing = false;
    }, 500)
  },
  methods: {
    update(value) {
      this.$emit('input', this.value);
    },
    toggle() {
      this.$emit('toggle')
    }
  }
};
</script>
<style>
</style>
