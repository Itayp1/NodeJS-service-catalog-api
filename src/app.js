/* eslint-disable no-undef */
const express = require("express"),
  serverless = require('serverless-http');

app = express(),
  loaders = require("./loaders"),
  Logger = require("./loaders/looger"),
  conf = require("../server.config");

const startServer = async () => {
  await loaders(app);

  app.listen(conf.PORT, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
        #################################################
             Server listening on port: ${conf.PORT} 
        #################################################
      `);
  });
};

startServer();
module.exports.handler = serverless(app);

// src
// │   app.js          # App entry point
// └───api             # Express route controllers for all the endpoints of the app
// └───config          # Environment variables and configuration related stuff
// └───jobs            # Jobs definitions for agenda.js
// └───loaders         # Split the startup process into modules
// └───models          # Database models
// └───services        # All the business logic is here
// └───subscribers     # Event handlers for async task
