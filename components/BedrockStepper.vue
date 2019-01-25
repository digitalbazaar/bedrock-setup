<template>
  <div class="column items-center width-100">
    <h4 class="text-center text-white q-mt-none q-mb-xxl">Let's get started!</h4>
    <section v-if="step === 1" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-welcome-icon.svg" width="100px" height="100px">
        </div>
        <div class="column items-center">
          <h4 class="text-center width-450 text-dark-gray">Welcome to the setup process for Product Name</h4>
          <h5 class="text-center text-dark-gray q-mt-sm q-mb-sm">The following steps will help you install the software:</h5>
          <ul class="text-dark-gray">
            <li>1. Domain Setup</li>
            <li>2. Administrator Setup</li>
            <li>3. Review</li>
          </ul>
        </div>
        <div>
          <q-btn v-on:click="next()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
        </div>
      </div>
    </section>
    <section v-if="step === 2" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-domain-icon.svg" width="100px" height="100px">
        </div>
        <div>
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">During this step, you will verify that the detected domain is appropriate</h5>
            <div class="width-100">
              <input type="text" placeholder="Domain" class="input-box">
              <p class="small-text text-dark-gray q-mt-xs">The fully qualified domain name for this server</p>
            </div>
          </div>
          <div class="row justify-between">
            <q-btn v-on:click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-lg">Back</q-btn>
            <q-btn v-on:click="next()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
          </div>
        </div> 
      </div>
      <div>

      </div>
    </section>
    <div class="dot">
        <ul>
          <li v-bind:class="{ 'is-active': step === 1 }"></li>
          <li v-bind:class="{ 'is-active': step === 2 }"></li>
          <li v-bind:class="{ 'is-active': step === 3 }"></li>
          <li v-bind:class="{ 'is-active': step === 4 }"></li>
        </ul>
      </div>
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import AccountInput from './AccountInput.vue';
import DomainInput from './DomainInput.vue';
import Review from './Review.vue';
import {SetupService} from './SetupService.js';

export default {
  name: 'BedrockStepper',
  components: {
    DomainInput, 
    AccountInput, 
    Review
  },
  data() {
    return {
      step: 1
    };
  },
  methods: {
    next() { 
      this.step += 1;
    },
    back() {
      this.step -= 1;
    }
  }
};
</script>
<style>

ul {
  list-style-type: none;
  padding-left: 0;
  font-size: 24px;
}

.input-box {
  font-size: 24px;
  width: 100%;
  padding: 10px;
  border: 1px solid #222;
}

.dot li{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  padding: 0;
  margin: 15px 5px;
  text-align: center;
  position: relative;
  background-color: #FFB9B9;
}

.dot .is-active{
  background-color: #BB5555;
}

.btn-width {
  width: 200px;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
}

.box-width {
  width: 100%;
  max-width: 900px;
}

.width-100 {
  width: 100%;
}

.width-450 {
  max-width: 450px;
}

.bg-red-main {
  background-color: #BB5555;
}

.text-red-main {
  color: #BB5555;
}

.border-red-main {
  border: 1px solid #BB5555;
}

.text-dark-gray {
  color: #222;
}

.q-mb-xxl {
  margin-bottom: 122px;
}

.small-text {
  font-size: 14px;
}

.circle {
  border-radius: 50%;
  margin-top: -124px;
}

</style>
