<template>
  <br-wizard @next="foo($event)"></br-wizard>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrWizard from './BrWizard.vue';

export default {
  name: 'Setup',
  components: {BrWizard},
  methods: {
    foo(event) {
      event.waitUntil(new Promise((resolve, reject) => {
        // do whatever, like error checking
        // ...
        console.log('test');
        
        if(error) {
          reject(error);
        } else {
          resolve();
        }      
      }));
    }
  }
};

</script>
<style>
</style>
