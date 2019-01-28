<template>
  <q-page class="column gutter-md background" padding>
    <div class="column items-center">
      <bedrock-stepper></bedrock-stepper>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BedrockStepper from './BedrockStepper.vue';

export default {
  name: 'Home',
  components: {BedrockStepper}
};

</script>
<style>
</style>
