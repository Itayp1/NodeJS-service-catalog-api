const mongooseLoader = require("./mongoose");
const models = require("../models")();
const expressLoader = require("./express");
const Logger = require("./looger");
// const redis = require("./redis");
require("../subscribers/send_email_on_registration");
module.exports = async app => {
  await mongooseLoader();
  Logger.info("✌️ MONGO DB loaded and connected!");

  // await redis;
  // Logger.info("✌️ Redis loaded and connected!");

  await models;
  Logger.info("✌️ DB models loaded!");

  await expressLoader(app);
  Logger.info("✌️ Express loaded!");

  // catch Uncaught error logging them
  require("./logging")();
};
