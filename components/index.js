/*
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import * as brVue from 'bedrock-vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

// FIXME: make configurable
Vue.config.devtools = true;

Vue.use(brVue);

brVue.setRootVue(async () => {
  // load dynamic imports in parallel
  const [
    {store, MemoryEngine},
    brQuasar,
    Quasar,
    {default: iconSet},
    {default: VueAsyncComputed},
    {default: Vuelidate},
    {getRootData}
  ] = await Promise.all([
    import('bedrock-web-store'),
    import('bedrock-quasar'),
    import('quasar'),
    import('quasar/icon-set/fontawesome-v5'),
    import('vue-async-computed'),
    import('vuelidate'),
    import('./rootData.js')
  ]);

  // configure shared memory store
  store.setEngine({engine: new MemoryEngine()});

  // install all Vue plugins
  Vue.use(VueAsyncComputed);
  Vue.use(Vuelidate);

  // replace default `br-root` with a custom one
  Vue.component('br-root', () => import('./BrRoot.vue'));

  const defaultBrand = {
    primary: '#bb5555'
  };

  const rootData = await getRootData();
  rootData.defaults();

  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/',
      component: () => import('./Home.vue'),
      meta: {title: 'Setup'}
    }]
  });

  router.beforeEach((to, from, next) => {
    if(to.meta.brand) {
      rootData.title = to.meta.title;
      rootData.subtitle = to.meta.subtitle;
      brQuasar.theme({
        Quasar,
        brand: to.meta.brand
      });
    } else {
      rootData.defaults();
      brQuasar.theme({
        Quasar,
        brand: defaultBrand
      });
    }
    next();
  });

  // configure quasar
  Quasar.iconSet.set(iconSet);
  brQuasar.theme({
    Quasar,
    brand: defaultBrand
  });

  const BrApp = Vue.component('br-app');
  return new BrApp({
    router
  });
});
