const VerifyToken = require("../services/Login"),
  Student = require("../services/Student"),
  Teacher = require("../services/Teacher"),
  CERROR = require("../services/CustomError");

require("express-async-errors");
module.exports = async (req, res, next) => {
  console.log("in verifyNewUserByToken");
  const { platform, token, access_token } = req.headers;
  if (!platform || !access_token) next(new CERROR("missing token", 401));

  //if (!access_token) throw new Error("missing acess token");

  const verifyToken = new VerifyToken(platform, token, access_token);
  //verify the token
  //const result = await verifyToken.verify();
  //decode the token and get the decoded payload

  const encodedjwt = await verifyToken.verify();

  const teacher = new Teacher(encodedjwt.email, null, null);
  const teacherExist = await teacher.isExist();
  const student = new Student(encodedjwt.email, null, null);

  const studentExist = await student.isExist();

  if (teacherExist || studentExist) {
    next(new CERROR("user  exist", 409));
  }

  //set the payload in the res varibale
  // eslint-disable-next-line require-atomic-updates
  req.body.email = encodedjwt.email;
  console.log("after verifyNewUserByToken");
  console.log(req.body.email);
  next();
};
