const config = require("../../server.config"),
  mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(config.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};
