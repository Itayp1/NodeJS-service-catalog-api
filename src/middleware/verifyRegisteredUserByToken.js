const VerifyToken = require("../services/Login"),
  client = require("../loaders/redis"),
  Student = require("../services/Student"),
  CERROR = require("../services/CustomError"),
  Teacher = require("../services/Teacher");

require("express-async-errors");
module.exports = async (req, res, next) => {
  const { platform, token, access_token } = req.headers;
  if (!platform || !token) next(new CERROR("missing token", 401));
  const existCache = await client.getAsync(JSON.stringify(token));
  if (existCache) {
    res.locals.jwt = JSON.parse(existCache);
    return next();
  }

  const verifyToken = new VerifyToken(platform, token, access_token);
  //verify the token
  //const result = await verifyToken.verify();
  //decode the token and get the decoded payload
  const encodedjwt = await verifyToken.decode();
  await verifyToken.verifygoogle();
  console.log("inside");

  const teacher = new Teacher(encodedjwt.email, null, null);
  const teacherExist = await teacher.isExist();
  const student = new Student(encodedjwt.email, null, null);

  const studentExist = await student.isExist();

  if (teacherExist) {
    encodedjwt.profile = "teacher";
  } else if (studentExist) {
    encodedjwt.profile = "student";
  } else {
    next(new Error("user not exist"));
  }

  client.set(JSON.stringify(token), JSON.stringify(encodedjwt), "EX", 10);

  //set the payload in the res varibale
  res.locals.email = encodedjwt.email;
  res.locals.profile = encodedjwt.profile;

  next();
};
