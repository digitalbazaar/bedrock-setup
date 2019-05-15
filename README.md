# Bedrock Setup

Bedrock setup is a standalone server that asks a series of questions and
serializes the answers to disk so that a separate setup process can
fully configure a server for a separate bedrock-based application to run.

## Develop a Setup Flow
This module can be used as a test harness for developing setup flows for
top-level applications. The test harness takes two command line parameters:
- path/filename for setup JSON file in the top-level application
- path/filename for the INI file that will be generated at the completion of
  the flow

Clone and install this module as a sibling to the top-level application, then:
```sh
# node setup.localhost.js <path to the setup.json file> <path to config.ini>
node setup.localhost.js ../my-app/packaging/bedrock-setup.json config.ini
```
