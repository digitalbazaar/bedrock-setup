/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const asyncHandler = require('express-async-handler');
const bedrock = require('bedrock');
const {config} = bedrock;
const {events} = bedrock;
const fs = require('fs').promises;
const logger = bedrock.loggers.get('app');

// ensure bedrock-express has been loaded
require('bedrock-express');

// load config defaults
require('./config');

// module API
const api = {};
module.exports = api;

bedrock.events.on('bedrock-express.configure.routes', app => {
  const {setup} = config;
  const {routes} = setup;

  // service to read the setup process file
  app.get(
    routes.setup,
    asyncHandler(async (req, res) => {
      const data = await fs.readFile(setup.setupFile, 'utf8');
      const setupProcess = JSON.parse(data);
      res.status(200).json(setupProcess);
    })
  );

  // service to write a config file
  app.post(
    routes.config,
    asyncHandler(async (req, res) => {
      const configData = req.body;
      let configIni = '[product]\n';
      for(const [key, value] of Object.entries(configData)) {
        configIni += key + '=' + value + '\n';
      }
      await fs.writeFile(setup.configFile, configIni);
      res.status(200).end();

      // shut down once a configuration has been written
      logger.info('configuration complete, shutting down.');
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    })
  );

});
