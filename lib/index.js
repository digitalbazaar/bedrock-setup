/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
require('bedrock');
require('bedrock-views');
require('bedrock-webpack');
require('bedrock-server');
require('bedrock-session-http');

// load config
require('./config');

// configure http endpoints
require('./http');
