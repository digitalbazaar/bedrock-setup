<template>
  <q-page
    class="column gutter-md background"
    padding>
    <div class="column items-center">
      <setup />
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import Setup from './Setup.vue';

export default {
  name: 'Home',
  components: {Setup}
};

</script>
<style>
</style>
