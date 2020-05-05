const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  config = require("../../server.config"),
  morgan = require("morgan"),
  helmet = require("helmet"),
  compression = require("compression"),
  Logger = require("./looger"),
  // eslint-disable-next-line no-undef
  isProduction = process.env.ENV === "production";

// const expressLoader = require("./express");
const routes = require("../api");

require("../subscribers/send_email_on_registration");
require("./logging")();

require("express-async-errors");
app.get("/", (req, res) => {
  res.send({ name: "John Doe" });
});
if (!isProduction) {
  app.use(morgan("tiny"));
}

// Health Check endpoints
app.get("/health", (req, res) => {
  res
    .status(200)
    .send("UP")
    .end();
});

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());
// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//register other security protections
app.use(helmet());
//register gzip compression
app.use(compression());
// Load API ye32
app.use(config.BASE_API, routes);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// catch exeptions from the express handler
app.use((err, req, res) => {
  Logger.error(`message:${err.message || err}`);
  // Any request to this server will get here, and will send an HTTP
  const status = err.status || 500;

  res.status(status).json({ status: err.message });
});
// app.listen(3000);
module.exports = app;
