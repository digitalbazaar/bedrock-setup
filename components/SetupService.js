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
    return {
      flow: [{
        icon: {
          name: 'far fa-list-alt',
          size: '65px',
          color: 'primary'
        },
        heading: 'FIXME Domain info',
        name: 'FIXME Domain',
        form: {
          id: 'domain',
          model: {
            domain: ''
          },
          schema: {
            domain: {
              placeholder: 'Your domain'
            }
          }
        }
      },
      {
        icon: {
          name: 'fas fa-map-marker-alt',
          size: '65px',
          color: 'primary'
        },
        heading: 'FIXME Administrator',
        name: 'FIXME Admin info',
        form: {
          id: 'administrator',
          model: {
            email: '',
            password: '',
            passwordConfirmation: ''
          },
          schema: {
            email: {
              placeholder: 'Admin email address'
            }
          }
        }
      }],
      vocab: {
        domain: {
          range: 'string',
          label: 'Domain',
          inputType: 'text'
        },
        email: {
          range: 'string',
          label: 'Email',
          inputType: 'email'
        },
        password: {
          range: 'string',
          label: 'Password',
          inputType: 'password'
        },
        passwordConfirmation: {
          range: 'string',
          label: 'Confirm',
          inputType: 'password'
        }
      },
      configTemplate: `{
        "domain": domain.domain,
        "admin": administrator
      }`,
      reviewTemplate: `[{
        "title": "Domain",
        "fields": [{
          "name": "Domain",
          "value": domain.domain
        }]
      }, {
        "title": "Administrator",
        "fields": [{
          "name": "Email",
          "value": administrator.email
        }]
      }]`
    };

    /*
    const url = this.config.urls.setup + '/';
    const response = await axios.get(url, {
      headers: {Accept: 'application/ld+json, application/json'}
    });
    return response.data;*/
  }

  async store(config) {
    const url = this.config.urls.config + '/';
    const response = await axios.post(url, config);
    return response.data;
  }
}
