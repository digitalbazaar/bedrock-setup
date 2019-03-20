<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title
          @click.native="goHome()">
          <strong>{{title}}</strong>
          <span v-if="subtitle">| {{subtitle}}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container style="overflow: auto">
      <router-view />
    </q-page-container>
    <q-footer />
  </q-layout>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {getSession} from 'bedrock-web-session';
import {getRootData} from './rootData.js';

export default {
  name: 'BrRoot',
  data() {
    return {
      rootData: null,
      showDrawer: false,
      session: null
    };
  },
  computed: {
    subtitle() {
      if(!this.rootData) {
        return;
      }
      return this.rootData.subtitle;
    },
    title() {
      if(!this.rootData) {
        return;
      }
      return this.rootData.title;
    }
  },
  async mounted() {
    this.rootData = await getRootData();
    this.session = await getSession();
    await this.session.refresh();
  }
};
</script>
<style lang="scss">
@import 'app.scss';
</style>
