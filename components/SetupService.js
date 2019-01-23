/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';

export class SetupService {
  constructor({
    urls = {
      setup: '/setup',
      config: '/config'
    }
  } = {}) {
    this.config = {urls};
  }

  async get() {
    const url = this.config.urls.setup + '/';
    const response = await axios.get(url, {
      headers: {'Accept': 'application/ld+json, application/json'}
    });
    return response.data;
  }

  async store(config) {
    const url = this.config.urls.config + '/';
    const response = await axios.post(url, config);
    return response.data;
  }

}
