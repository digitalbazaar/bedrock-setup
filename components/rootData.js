/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {store} from 'bedrock-web-store';

export const getRootData = async () => {
  const id = 'rootData';
  try {
    const data = {};
    data.defaults = () => {
      data.title = 'Bedrock';
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
