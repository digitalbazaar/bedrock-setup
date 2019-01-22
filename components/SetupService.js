/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';

export class SetupService {
  constructor({
    urls = {
      base: '/setup'
    }
  } = {}) {
    this.config = {urls};
  }

  async get() {
    const url = this.config.urls.base + '/';
    const response = await axios.get(url, {
      headers: {'Accept': 'application/ld+json, application/json'}
    });
    return response.data;
  }
}
