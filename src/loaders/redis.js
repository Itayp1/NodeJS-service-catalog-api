const redis = require("redis"),
  bluebird = require("bluebird"),
  config = require("../../server.config");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = redis.createClient(
  config.REDIS_PORT,
  config.REDIS_CONNECTION_STRING,
  {
    password: "teacher4u"
  }
);
