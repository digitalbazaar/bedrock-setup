<template>
  <div class="column items-center width-100">
    <h4 class="text-center text-white q-mt-none q-mb-xxl fadeInRight">Let's get started!</h4>
    <section v-if="step === 1" class="column items-center width-100" :class="{'fadeInTop': initialLoad}">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-welcome-icon.svg" width="100px" height="100px">
        </div>
        <div class="column items-center" :class="{'slideOutLeft': slideOutLeft, 'slideInLeft': slideInLeft}">
          <h4 class="text-center width-450 text-dark-gray">Welcome to the setup process for Product Name</h4>
          <h5 class="text-center text-dark-gray q-mt-sm q-mb-sm">The following steps will help you install the software:</h5>
          <ul class="text-dark-gray list">
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
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-domain-icon.svg" width="100px" height="100px">
        </div>
        <form :class="{'slideInRight': step === 2, 'slideOutLeft': slideOutLeft, 'slideInLeft': slideInLeft, 'slideOutRight': slideOutRight}">
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">During this step, you will verify that the detected domain is appropriate</h5>
            <div class="width-100">
              <input v-model="domain.value" type="text" placeholder="Domain" class="input-box" :class="{'error-input': $v.domain.value.$invalid && domain.error}">
              <p class="small-text text-dark-gray q-mt-xs">The fully qualified domain name for this server</p>
            </div>
            <span v-if="$v.domain.value.$invalid && domain.error" class="error-message width-100 width-450">{{domain.errorMessage}}</span>
          </div>
          <div class="row justify-between">
            <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-lg">Back</q-btn>
            <q-btn @click="storeDomain()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
          </div>
        </form> 
      </div>
    </section>
    <section v-if="step === 3" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-person-icon.svg" width="100px" height="100px">
        </div>
        <form  :class="{'slideInRight': step === 3, 'slideOutLeft': slideOutLeft, 'slideInLeft': slideInLeft, 'slideOutRight': slideOutRight}">
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">This step is used to configure the administrator account for this system</h5>
            <div class="width-100">
              <input v-model="email.value" type="email" placeholder="Email" required class="input-box" :class="{'error-input': $v.email.value.$invalid && email.error}">
              <p class="small-text text-dark-gray q-mt-xs">The email address associated with this account</p>
            </div>
            <span v-if="$v.email.value.$invalid && email.error" class="error-message width-100 width-450 q-mb-md">{{email.errorMessage}}</span>
            <div class="width-100">
              <div class="no-wrap">
                <input v-model="password.value" :type="passwordToggle" placeholder="Password" required class="input-box input-icon" :class="{'error-input': $v.password.value.$invalid && password.error}"><span @click="togglePassword()" :class="{'hide-password': passwordToggle === 'password', 'show-password': passwordToggle === 'text'}"></span>
              </div>
              <p class="small-text text-dark-gray q-mt-xs">The login password for the account</p>
            </div>
            <span v-if="$v.password.value.$invalid && password.error" class="error-message width-100 width-450 q-mb-md">{{password.errorMessage}}</span>
            <div class="width-100">
              <input v-model="verify.value" :type="verifyToggle" placeholder="Verify" required class="input-box input-icon" :class="{'error-input': $v.verify.value.$invalid && verify.error}"><span @click="toggleVerify()" :class="{'hide-password': verifyToggle === 'password', 'show-password': verifyToggle === 'text'}"></span>
              <p class="small-text text-dark-gray q-mt-xs">Verify the login password for the account</p>
            </div>
            <span v-if="$v.verify.value.$invalid && verify.error" class="error-message width-100 width-450 q-mb-md">{{verify.errorMessage}}</span>
          </div>
          <div class="row justify-between">
            <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-lg">Back</q-btn>
            <q-btn @click="storeAdministrator()" class="bg-red-main text-white btn-width q-mt-lg">Next</q-btn>
          </div>
        </form> 
      </div>
    </section>
     <section v-if="step === 4" class="column items-center width-100">
      <div class="column items-center bg-white box-width q-pa-xl round-borders shadow-6 overflow-hidden">
        <div class="circle absolute bg-white q-pa-lg">
          <img src="/images/stepper-review-icon.svg" width="100px" height="100px">
        </div>
        <div :class="{'slideInRight': step === 4, 'slideOutLeft': slideOutLeft, 'slideOutRight': slideOutRight}">
          <div class="column items-center">
            <h5 class="text-center width-450 text-dark-gray">Please review the information you entered and then complete the setup process</h5>
            <div class="row justify-center width-100 wrap items-center">
              <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Domain:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{domain.value}}</h5>
            </div>
            <div class="row justify-center width-100 wrap items-center">
              <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Administrator:</h5><h5 class="col text-left width-450 text-dark-gray q-pl-lg q-mt-sm q-mb-sm overflow">{{email.value}}</h5>
            </div>
            <div class="row justify-center width-100">
              <h5 class="col text-right width-450 text-dark-gray q-pr-lg q-mt-sm q-mb-sm">Password:</h5><input @click="revealPassword()" :type="passwordReveal" :value="password.value" readonly class="col read-input">
            </div>
          </div>
          <div class="row justify-between">
            <q-btn @click="back()" class="bg-white border-red-main text-red-main btn-width q-mt-xl">Back</q-btn>
            <q-btn @click="submit()" class="bg-red-main text-white btn-width q-mt-xl">Apply</q-btn>
          </div>
        </div> 
      </div>
    </section>
    <div class="dot fadeInBottom">
        <ul class="list">
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

import {required, email, helpers} from 'vuelidate/lib/validators';
import { setTimeout } from 'timers';

const strongPassword = helpers.regex('strongPassword', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);
const domainName = helpers.regex('domainName', /^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/);
const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

export default {
  name: 'BedrockStepper',
  props: ['value', 'title', 'outputPrefix'],
  data() {
    return {
      step: 1,
      passwordToggle: 'password',
      verifyToggle: 'password',
      passwordReveal: 'password',
      domain: {
        value: '',
        error: false,
        errorMessage: '',
      },
      email: {
        value: '',
        error: false,
        errorMessage: '',
      },
      password: {
        value: '',
        error: false,
        errorMessage: '',
      },
      verify: {
        value: '',
        error: false,
        errorMessage: '',
      },
      apply: {},
      initialLoad: true,
      slideInRight: false,
      slideInLeft: false,
      slideOutRight: false,
      slideOutLeft: false
    };
  },
  methods: {
    next() { 
      this.initialLoad = false,
      this.slideOutLeft = true;
      this.slideInLeft = false;
      setTimeout(() => {
        this.step += 1;
        this.slideOutLeft = false;
      }, 300)
    },
    back() {
      this.slideOutRight = true;
      this.slideInLeft = false;
      setTimeout(() => {
        this.step -= 1;
        this.slideOutRight = false;
        this.slideInLeft = true;
      }, 300)
    },
    storeDomain() {
      if(!this.$v.domain.value.$invalid) {
        this.domain.error = false;
        this.slideOutLeft = true;
        this.slideInLeft = false;
        setTimeout(() => {
          this.step += 1;
          this.slideOutLeft = false;
        }, 300)
      }
      else
        this.domainError;
    },
    storeAdministrator() {
      if (!this.$v.email.value.$invalid && !this.$v.password.value.$invalid && !this.$v.verify.value.$invalid) {
        this.email.error = false;
        this.password.error = false;
        this.verify.error = false;
        this.slideOutLeft = true;
        this.slideInLeft = false;
        setTimeout(() => {
          this.step += 1;
          this.slideOutLeft = false;
        }, 300)
      } else {
        this.administratorError;
      }
    },
    submit() {
      this.apply = {
        domain: this.domain.value,
        adminstrator: this.email.value,
        password: this.password.value
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
    },
    administratorError() {
      if(this.$v.email.value.$invalid) {
        this.email.errorMessage = 'The email you entered is not a valid email address.';
        this.email.error = true;
      }
      if(this.$v.password.value.$invalid) {
        this.password.errorMessage = 'Your password must be at least 16 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.';
        this.password.error = true;
      }
      if(!this.$v.verify.value.passwordsMatch) {
        this.verify.errorMessage = 'Passwords do no match.';
        this.verify.error = true;
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
    },
    email: {
      value: {
        required,
        email
      }
    },
    password: {
      value: {
        required,
        strongPassword
      }
    },
    verify: {
      value: {
        required,
        passwordsMatch(value) {
          return this.password.value === this.verify.value;
        }
      }
    } 
  }
};
</script>
<style>

.list {
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

.input-box:focus,
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

.overflow-hidden {
  overflow: hidden
}

.overflow {
  overflow: scroll;
}

::-webkit-scrollbar { 
    display: none; 
}

.error-message {
  background-color: #BB5555;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.error-input {
  border-color: #BB5555;
}

/* Animation */
@keyframes fadeInTop {
    0% {
        opacity: 0;
        transform: translateY(-40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}  

.fadeInTop {
  animation-delay: .2s;
  animation-name: fadeInTop;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translateX(40px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}  

.fadeInRight {
  animation-delay: 0s;
  animation-name: fadeInRight;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
} 

@keyframes fadeInBottom {
    0% {
        opacity: 0;
        transform: translateY(40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}  

.fadeInBottom {
  animation-delay: .4s;
  animation-name: fadeInBottom;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes slideInRight {
    0% {
        transform: translateX(100vw);
    }
    100% {
        transform: translateX(0);
    }
}  

.slideInRight {
  animation-delay: 0s;
  animation-name: slideInRight;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
} 



@keyframes slideOutLeft {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100vw);
    }
}  

.slideOutLeft {
  animation-delay: 0s;
  animation-name: slideOutLeft;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
} 

@keyframes slideInLeft {
    0% {
        transform: translateX(-100vw);
    }
    100% {
        transform: translateX(0);
    }
}  

.slideInLeft {
  animation-delay: 0s;
  animation-name: slideInLeft;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
} 



@keyframes slideOutRight {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100vw);
    }
}  

.slideOutRight {
  animation-delay: 0s;
  animation-name: slideOutRight;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
} 

/* Media Queries */
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
