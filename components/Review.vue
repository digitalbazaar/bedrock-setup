<template>
  <dl class="horizontal">
      <div v-for="item in config">
        <dt>{{item.title}}</dt>
        <dd v-if="!item.hidden">{{item.value}}</dd>
        <dd v-else>
          <q-input type="password" v-model="item.value"/>
        </dd>
      </div>
  </dl>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {required, email, helpers} from 'vuelidate/lib/validators';

const strongPassword = helpers.regex('strongPassword',
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})/);

export default {
  name: 'Review',
  props: ['config']
};
</script>
<style>
</style>
