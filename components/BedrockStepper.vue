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
            <h5 class="q-mt-xs q-mb-xs">1. Domain Setup</h5>
            <h5 class="q-mt-xs q-mb-xs">2. Administrator Setup</h5>
            <h5 class="q-mt-xs q-mb-xs">3. Review</h5>
          </ul>
          <div class="row justify-center width-100">
            <q-btn v-on:click="next()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
          </div>
        </div>
      </div>
    </section>
    <section v-if="step === 2" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-domain-icon.svg" width="100px" height="100px">
        </div>
        <form>
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">During this step, you will verify that the detected domain is appropriate</h5>
            <div class="width-100">
              <input v-model="domain" type="text" placeholder="Domain" class="input-box">
              <p class="small-text text-dark-gray q-mt-xs">The fully qualified domain name for this server</p>
            </div>
          </div>
          <div class="row justify-between">
            <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-lg">Back</q-btn>
            <q-btn @click="storeDomain()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
          </div>
        </form> 
      </div>
    </section>
    <section v-if="step === 3" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-person-icon.svg" width="100px" height="100px">
        </div>
        <form>
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">This step is used to configure the administrator account for this system</h5>
            <div class="width-100">
              <input v-model="administrator" type="email" placeholder="Email" required class="input-box">
              <p class="small-text text-dark-gray q-mt-xs">The email address associated with this account</p>
            </div>
            <div class="width-100">
              <div class="no-wrap">
                <input v-model="password" :type="passwordToggle" placeholder="Password" required class="input-box input-icon"><span @click="togglePassword()" :class="{'hide-password': passwordToggle === 'password', 'show-password': passwordToggle === 'text'}"></span>
              </div>
              <p class="small-text text-dark-gray q-mt-xs">The login password for the account</p>
            </div>
            <div class="width-100">
              <input v-model="verify" :type="verifyToggle" placeholder="Verify" required class="input-box input-icon"><span @click="toggleVerify()" :class="{'hide-password': verifyToggle === 'password', 'show-password': verifyToggle === 'text'}"></span>
              <p class="small-text text-dark-gray q-mt-xs">Verify the login password for the account</p>
            </div>
          </div>
          <div class="row justify-between">
            <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-lg">Back</q-btn>
            <q-btn @click="storeAdministrator()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
          </div>
        </form> 
      </div>
    </section>
     <section v-if="step === 4" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-review-icon.svg" width="100px" height="100px">
        </div>
        <div>
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">Please review the information you entered and then complete the setup process</h5>
            <div class="row justify-center width-100 wrap">
              <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Domain:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{domain}}</h5>
            </div>
            <div class="row justify-center width-100 wrap">
              <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Administrator:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{administrator}}</h5>
            </div>
            <div class="row justify-center width-100">
              <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Password:</h5><input @click="revealPassword()" :type="passwordReveal" :value="password" readonly class="col read-input">
            </div>
          </div>
          <div class="row justify-between">
            <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-xl">Back</q-btn>
            <q-btn @click="submit()" class="bg-red-main text-white btn-width q-mt-xl">Apply</q-btn>
          </div>
        </div> 
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
import {required, email, helpers} from 'vuelidate/lib/validators';

const strongPassword = helpers.regex('strongPassword',
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);

export default {
  name: 'BedrockStepper',
  components: {
    DomainInput, 
    AccountInput, 
    Review
  },
  data() {
    return {
      step: 1,
      passwordToggle: 'password',
      verifyToggle: 'password',
      passwordReveal: 'password',
      domain: '',
      administrator: '',
      password: '',
      verify: '',
      apply: {}
    };
  },
  methods: {
    next() { 
      this.step += 1;
    },
    back() {
      this.step -= 1;
    },
    storeDomain() {
      console.log('Store Domain', this.domain)
      this.step += 1;
    },
    storeAdministrator() {
      console.log('Store Administrator')
      if (this.password === this.verify) {
        console.log('Passwords Match');
        this.step += 1;
      } else {
        console.log('Passwords Do Not Match');
      }
    },
    submit() {
      this.apply = {
        domain: this.domain,
        adminstrator: this.administrator,
        password: this.password
      }
      console.log('Submit', this.apply);
    },
    togglePassword() {
      if (this.passwordToggle === 'password')
        this.passwordToggle = 'text'
      else
        this.passwordToggle = 'password'
    },
    toggleVerify() {
      if (this.verifyToggle === 'password')
        this.verifyToggle = 'text'
      else
        this.verifyToggle = 'password'
    },
    revealPassword() {
      if (this.passwordReveal === 'password')
        this.passwordReveal = 'text'
      else
        this.passwordReveal = 'password'
    }
  },
  validations: {
    
  }
};
</script>
<style>

ul {
  list-style-type: none;
  padding-left: 0;
}

.input-box {
  font-size: 24px;
  padding: 10px;
  width: 100%;
  border: 1px solid #222;
  color: #222
}

.input-icon {
  padding: 10px 50px 10px 10px;
}

.input-box::placeholder {
  color: #B1B1B1;
}

.read-input {
  font-size: 24px;
  border: none;
  margin-left: 24px;
  cursor: pointer;
  color: #222
}

.read-input:focus {
  outline: none;
}

.toggle-password {
  margin: 15px 0 0 -40px;
  position: absolute;
}

.hide-password,
.show-password {
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;
  position: absolute;
  cursor: pointer;
}

.hide-password {
  background-image: url('/images/stepper-hidden-icon.svg');
  margin: 8px 0 0 -50px;
}

.show-password {
  background-image: url('/images/stepper-shown-icon.svg');
  margin: 7px 0 0 -50px;
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
  width: calc(50% - 20px);
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

.overflow {
  overflow: scroll;
}

@media screen and (max-width: 767px) {
  .input-box,
  .read-input {
    font-size: 14px;
  }

  .hide-password {
    margin: 2px 0 0 -45px;
  }

.show-password {
    margin: 1px 0 0 -45px;
  }
  
}

</style>
