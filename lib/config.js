/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');
const os = require('os');
const path = require('path');
require('bedrock-express');
require('bedrock-server');

const rootPath = path.join(__dirname, '..');

// common paths
config.paths.cache = path.join(__dirname, '..', '.cache');
config.paths.log = path.join(os.tmpdir(), 'bedrock-setup');

// core configuration
config.core.workers = 1;
config.core.master.title = 'bedrock-setup-1d';
config.core.worker.title = 'bedrock-setup-1d-worker';
config.core.worker.restart = true;

// logging
config.loggers.email.silent = true;
config.loggers.email.to = ['root@localhost'];
config.loggers.email.from = 'bedrock@localhost';

// server info
config.server.port = 10443;
config.server.httpPort = 10080;
config.server.domain = '0.0.0.0';

// express info
config.express.session.secret = 'NOTASECRET';
config.express.session.key = 'bedrock-setup.sid';
config.express.session.prefix = 'bedrock-setup.';

// add pseudo packages
config.views.bundle.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});

// manifest.json
config.express.static.push({
  route: '/images',
  path: path.join(__dirname, '..', 'components', 'images')
});
config.express.static.push({
  route: '/manifest.json',
  file: true,
  path: path.join(__dirname, '..', 'components', 'manifest.json')
});

// Get the configuration file for the setup process
config.setup = {
  setupFile: path.resolve(process.argv[2] || '/tmp/invalid.json'),
  configFile: path.resolve(process.argv[3] || '/tmp/invalid.ini'),
  routes: {
    setup: '/setup',
    config: '/config'
  }
};
