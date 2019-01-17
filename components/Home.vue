<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <div class="justify-center">
        <h4>
          <img
            height="80px"
            src="/images/veres-logo-teal-64.png">
        </h4>
      </div>
      <div>
        <h4 class="text-center">Setup</h4>
        <bedrock-setup>
          Do setup here...
        </bedrock-setup>
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BedrockSetup} from './BedrockSetup.vue';

export default {
  name: 'Setup',
  components: {BedrockSetup}
};

</script>
<style>
</style>
