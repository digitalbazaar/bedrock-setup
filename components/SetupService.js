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
              placeholder: 'Your domain',
              validation: {
                // TODO: also support IP address
                regex:
                  '^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*' +
                  '(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$',
                errors: {
                  invalid: 'The domain you entered is invalid.'
                }
              }
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
              placeholder: 'Admin email address',
              validation: {
                required: true,
                regex:
                  '^[-a-zA-Z0-9~!$%^&*_=+}{\\\'?]+(\\.[-a-zA-Z0-9~!$%^&*_=+}' +
                  '{\\\'?]+)*@(((([a-zA-Z0-9]{1}[a-zA-Z0-9\\-]{0,62}' +
                  '[a-zA-Z0-9]{1})|[a-zA-Z])\\.)+[a-zA-Z]{2,6})$',
                errors: {
                  invalid: 'The email you entered is not a valid email address.'
                }
              }
            },
            password: {
              validation: {
                regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})',
                required: true,
                errors: {
                  invalid: 'Password is required.',
                  regex: 'Your password must be at least 16 characters long, ' +
                    'contain at least one number and have a mixture ' +
                    'of uppercase and lowercase letters.'
                }
              }
            },
            passwordConfirmation: {
              validation: {
                regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,})',
                required: true,
                match: 'password',
                errors: {
                  invalid: 'Password confirmation is required.',
                  required: 'Password confirmation is required.',
                  match: 'Passwords do not match.'
                }
              }
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
          inputType: 'masked'
        },
        passwordConfirmation: {
          range: 'string',
          label: 'Confirm Password',
          inputType: 'masked'
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
