<template>
  <q-layout>

    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat round dense
          @click="showDrawer = !showDrawer"
          icon="fa fa-bars" />
        <q-toolbar-title
          @click.native="goHome()">
          <strong>{{title}}</strong>
          <span v-if="subtitle">| {{subtitle}}</span>
        </q-toolbar-title>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="showDrawer">
      <q-list-header>
        <strong class="text-primary">Setup</strong>
      </q-list-header>
      <q-list no-border link>
        <q-item to="/">
          <q-item-side icon="fa fa-home" />
          <q-item-main label="Home" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container style="overflow: auto">
      <router-view/>
    </q-page-container>

    <q-layout-footer>
    </q-layout-footer>

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
  async mounted() {
    this.rootData = await getRootData();
    this.session = await getSession();
    await this.session.refresh();
  },
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
  methods: {
    goHome() {
      this.$router.push({path: '/'});
    }
  }
};
</script>
<style>
</style>
