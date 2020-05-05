require("../../src/models/Student");
require("../../src/models/Teacher");
require("../../src/models/Chat");
require("../../src/models/TimeTable");

require("dotenv").config();

const mongooseLoader = require("../../src/loaders/mongoose");
// eslint-disable-next-line no-undef
module.exports = async () => {
  await mongooseLoader();
  return;
};
