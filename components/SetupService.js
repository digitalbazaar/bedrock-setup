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

    return {
      product: 'Veres Wallet',
      steps: [{
        title: 'Welcome',
        image: 'logo.png',
        description: 'Welcome to the setup process for Veres Wallet. ' +
          'The following steps will help you install the software. ' +
          'Click next to continue.',
        stepType: 'Message'
      },
      {
        title: 'Domain',
        description: 'During this step, you will verify that the detected ' +
          'domain is appropriate.',
        stepType: 'DomainInput',
        outputPrefix: 'domain'
      },
      {
        title: 'Administrator',
        description: 'This step is used to configure the administrator ' +
          'account for this system.',
        stepType: 'AccountInput',
        outputPrefix: 'admin'
      },
      {
        title: 'Review',
        description: 'Please review the information you entered and click ' +
          'Apply to complete the setup process.',
        stepType: 'Review'
      }]
    };/*
    const url = this.config.urls.base;
    const response = await axios.get(url + '/', {
      headers: {'Accept': 'application/ld+json, application/json'}
    });
    return response.data;*/
  }
}
