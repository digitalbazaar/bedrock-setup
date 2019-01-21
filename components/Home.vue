<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <div class="justify-center">
        <bedrock-setup></bedrock-setup>
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BedrockSetup from './BedrockSetup.vue';

export default {
  name: 'Home',
  components: {BedrockSetup}
};

</script>
<style>
</style>
