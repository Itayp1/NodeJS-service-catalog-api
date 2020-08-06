/* eslint-disable no-undef */
const bodyParser = require("body-parser"),
  cors = require("cors"),
  routes = require("../api"),
  morgan = require("morgan"),
  helmet = require("helmet"),
  compression = require("compression"),
  Logger = require("./looger"),
  express = require("express"),
  path = require("path"),
  // path1 = require("../../public"),

  isProduction = process.env.ENV === "production";
require("express-async-errors");

module.exports = app => {
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
  app.use(express.static(path.join(__dirname, 'build')));

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(({ body, headers }, res, next) => {
    if (headers["content-length"] < 100) {
      console.log(body);
    }
    // console.log(headers.authorization);
    next();
  });
  //register other security protections
  app.use(helmet());
  //register gzip compression
  app.use(compression());
  // Load API ye32

  app.use('/api', routes);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))

  });
  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  // catch exeptions from the express handler

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    Logger.error(`message:${err.stack || err}`);

    // Any request to this server will get here, and will send an HTTP
    const status = err.status || 500;

    res.status(status).json({ status: err.message });
  });
};
