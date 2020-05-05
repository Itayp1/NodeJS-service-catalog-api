const appRoot = require("app-root-path"),
  { createLogger, format, transports } = require("winston"),
  { combine, timestamp, prettyPrint } = format;

const options = {
  info: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(timestamp(), prettyPrint())
  },
  error: {
    level: "error",
    filename: `${appRoot}/logs/error.log`,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(timestamp(), prettyPrint())
  },
  console: {
    level: "debug",
    colorize: true,
    format: format.combine(format.cli(), format.splat())
  }
};
// instantiate a new Winston Logger with the settings defined above
var logger = createLogger({
  transports: [
    new transports.File(options.error),
    new transports.File(options.info),

    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

module.exports = logger;
