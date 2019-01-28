<template>
  <section v-if="step === 2" class="column items-center width-100">
    <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
      <div class="circle absolute bg-white q-pa-lg">
        <img src="/images/stepper-domain-icon.svg" :class="{'fadeInIcon': animations.fadeInIcon, 'fadeOutIcon': animations.fadeOutIcon}">
      </div>
      <form :class="{'slideInRight': step === 2, 'slideOutLeft': animations.slideOutLeft, 'slideInLeft': animations.slideInLeft, 'slideOutRight': animations.slideOutRight}">
        <div class="column items-center">
          <h5 class="text-center width-450 text-dark-gray">During this step, you will verify that the detected domain is appropriate</h5>
          <div class="width-100">
            <input v-model="domain.value" type="text" placeholder="Domain" class="input-box" :class="{'error-input': $v.domain.value.$invalid && domain.error}">
            <p class="small-text text-dark-gray q-mt-xs">The fully qualified domain name for this server</p>
          </div>
          <span v-if="$v.domain.value.$invalid && domain.error" class="error-message width-100 width-450">{{domain.errorMessage}}</span>
        </div>
        <div class="row justify-between">
          <back-button @back="back()"></back-button>
          <next-button @next="next()"></next-button>
        </div>
      </form> 
    </div>
  </section>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import {required, email, helpers} from 'vuelidate/lib/validators';

const domainName = helpers.regex('domainName', /^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/);
const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

export default {
  name: 'DomainStep',
  components: {NextButton, BackButton},
  props: {
    step: {
      type: Number,
      required: true
    },
    animations: {
      type: Object,
      required: true,
    },
    domain: {
      type: Object,
      required: true,
    }
  },
  methods: {
    next() {
      if(this.$v.domain.value.$invalid) {
        return this.domainError;
      }
      this.domain.error = false;
      this.$emit('next')
    },
    back() {
      this.$emit('back')
    }
  },
  computed: {
    domainError() {
      if(!this.$v.domain.value.domainName) {
        this.domain.errorMessage = 'The domain you entered is not a valid domain name.';
        this.domain.error = true;
      }
      if(!this.$v.domain.value.domainMatchesHostname) {
        this.domain.errorMessage = 'The domain name you entered does not match your browser location bar.';
        this.domain.error = true;
      }
      if(!this.$v.domain.value.notIpAddress) {
        this.domain.errorMessage = 'You cannot use an IP address.';
        this.domain.error = true;
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
