<template>
  <form class="column items-center width-100">
    <input-box :value="domain.value" :invalid="$v.domain.value.$invalid" :error="domain.error" :errorMessage="domain.errorMessage" :description="input.description"></input-box>
  </form>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import InputBox from './InputBox.vue';
import {required, email, helpers} from 'vuelidate/lib/validators';

const domainName = helpers.regex('domainName', /^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/);
const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

export default {
  name: 'Domain',
  components: {InputBox},
  data() {
    return {
      domain: {
        value: '',
        error: false,
        errorMessage: '',
      },
      input: {
        description: 'The fully qualified domain name for this server'
      }
    }
  },
  methods: {
    errorCheck() {
      if(this.$v.domain.value.$invalid) {
        this.domain.error = true;
        return this.domainError;
      }
      this.domain.error = false;
    },
  },
  computed: {
    domainError() {
      if(!this.$v.domain.value.domainName) {
        this.domain.errorMessage = 'The domain you entered is not a valid domain name.';
      }
      if(!this.$v.domain.value.domainMatchesHostname) {
        this.domain.errorMessage = 'The domain name you entered does not match your browser location bar.';
      }
      if(!this.$v.domain.value.notIpAddress) {
        this.domain.errorMessage = 'You cannot use an IP address.';
      }
    }
  },
  validations: {
    domain: {
      value: {
        required,
        domainName,
        notIpAddress(value) {
          return !ipRegex.test(value);
        },
        domainMatchesHostname(value) {
          return (value === window.location.hostname);
        }
      }
    }
  }
};
</script>
<style>
</style>
