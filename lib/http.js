/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const asyncHandler = require('express-async-handler');
const bedrock = require('bedrock');
const {config} = bedrock;
const fs = require('fs');

// ensure bedrock-express has been loaded
require('bedrock-express');

// load config defaults
require('./config');

// module API
const api = {};
module.exports = api;

bedrock.events.on('bedrock-express.configure.routes', app => {
  const {basePath} = config.setup.routes;

  app.get(
    basePath,
    asyncHandler(async (req, res) => {
      fs.readFile(config.setup.file, {encoding: 'utf-8'}, (err, data) => {
        if(err) {
          return res.status(404).end();
        }
        const setupProcess = JSON.parse(data);
        res.status(200).json(setupProcess);
      });
    })
  );
});
