<template>
  <q-page
    class="column gutter-md background"
    padding>
    <div class="column items-center">
      <br-setup-wizard
        :flow="flow"
        :vocab="vocab"
        :config-template="configTemplate"
        :review-template="reviewTemplate"
        @finish="finish($event)" />
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';
import BrSetupWizard from './BrSetupWizard.vue';
import {SetupService} from './SetupService.js';

export default {
  name: 'Home',
  components: {BrSetupWizard},
  data() {
    return {
      flow: [],
      vocab: {},
      configTemplate: {},
      reviewTemplate: {},
      flowLoaded: false
    };
  },
  async created() {
    this.setupService = new SetupService();
    const setupData = await this.setupService.get();
    const {flow, vocab, configTemplate, reviewTemplate} = setupData;
    this.flow = flow;
    this.vocab = vocab;
    this.configTemplate = configTemplate;
    this.reviewTemplate = reviewTemplate;
    this.flowLoaded = true;
  },
  methods: {
    finish(event) {
      event.waitUntil(this.storeConfig(event.config));
    },
    async storeConfig(config) {
      try {
        this.$q.loading.show({
          message: 'Loading your new site...'
        });
        await this.setupService.store(config);
      } catch(e) {
        this.$q.loading.hide();
        throw e;
      }
      this.refreshAfterRestart();
    },
    refreshAfterRestart() {
      setTimeout(async () => {
        try {
          await axios.get(window.location);
          window.location.replace(window.location);
        } catch(err) {
          this.refreshAfterRestart();
        }
      }, 3000);
    }
  }
};

</script>
<style>
</style>
