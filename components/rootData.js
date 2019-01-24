/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {store} from 'bedrock-web-store';
import {SetupService} from './SetupService.js';

export const getRootData = async () => {
  const id = 'rootData';
  try {
    const data = {};
    const setupProcess = await new SetupService().get();
    data.defaults = () => {
      data.title = setupProcess.product;
      data.subtitle = 'Setup';
    };
    await store.create({id, object: data});
    return data;
  } catch(e) {
    if(e.name === 'DuplicateError') {
      return store.get({id});
    }
    throw e;
  }
};
