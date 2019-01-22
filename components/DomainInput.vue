<template>
  <q-field
    icon="fa fa-globe"
    label="Domain"
    helper="The fully qualified domain name for this server"
    :error="$v.domain.$error"
    :error-label="errorLabel"
  >
    <q-input
      type="domain"
      v-model="domain"
      @input="updateValue()"
      @blur="$v.domain.$touch"
      @keyup="$v.domain.$touch"
    />
  </q-field>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {required, helpers} from 'vuelidate/lib/validators';
const domainName = helpers.regex('domainName', /^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/);
const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

export default {
  name: 'DomainInput',
  props: ['value', 'title', 'outputPrefix'],
  methods: {
    updateValue() {
      this.$emit('input', {
        ...this.value,
        [this.outputPrefix]: {
          title: this.title,
          value: this.domain
        }
      });
    }
  },
  mounted() {
    this.updateValue();
  },
  data() {
    return {
      domain: this.value[this.outputPrefix] || window.location.hostname
    };
  },
  computed: {
    errorLabel() {
      let label = '';
      if(!this.$v.domain.domainName) {
        label = ' The domain you entered is not a valid domain name.';
      }
      if(!this.$v.domain.domainMatchesHostname) {
        label = ' The domain name you entered does not match your ' +
          'browser location bar.';
      }
      if(!this.$v.domain.notIpAddress) {
        label = ' You cannot use an IP address.';
      }
      return label;
    }
  },
  validations: {
    domain: {
      required,
      domainName,
      notIpAddress(value) {
        return !ipRegex.test(value);
      },
      domainMatchesHostname(value) {
        return (value === window.location.hostname);
      }}
  }
};
</script>
<style>
</style>
