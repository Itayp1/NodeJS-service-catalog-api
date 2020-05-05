/* eslint-disable no-undef */
const Logger = require("./looger");

module.exports = () => {
  process
    .on("unhandledRejection", reason => {
      Logger.error(
        `message:${reason ? reason.message : ""} stack:${reason ? reason.stack : ""}`
      );
    })
    .on("uncaughtException", err => {
      Logger.error(`message:${err.message || err} stack:${err.stack || null}`);
      //  / process.exit(1);
    });
  process.on("SIGINT", () => {
    process.exit();
  });
};
