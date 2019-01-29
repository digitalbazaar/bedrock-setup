<template>
  <q-page class="column gutter-md background" padding>
    <div class="column items-center">
      <setup-wizard></setup-wizard>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import SetupWizard from './SetupWizard.vue';

export default {
  name: 'Home',
  components: {SetupWizard}
};

</script>
<style>
</style>
