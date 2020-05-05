const redis = require("redis"),
  //bluebird = require("bluebird"),
  config = require("../server.config");

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(
  config.REDIS_PORT,
  config.REDIS_CONNECTION_STRING,
  { password: "teacher4u" }
);
client.on("connect", function() {
  console.log("Redis client connected");
});

// const existCache = await client.getAsync(JSON.stringify(access_token));
// if (existCache) {
//   res.locals.jwt = JSON.parse(existCache);
//   return next();
// }
// console.log(existCache);

client.set(
  "JSON.stringify(access_token)",
  "JSON.stringify(encodedjwt)",
  "EX",
  44
);
