const VerifyToken = require("../services/Login"),
  Student = require("../services/Student"),
  Teacher = require("../services/Teacher"),
  CERROR = require("../services/CustomError");
const JsonWebToken = require("../services/JsonWebToken");

require("express-async-errors");
module.exports = async (req, res, next) => {
  const { platform, access_token } = req.headers;

  //if (!access_token) throw new Error("missing acess token");
  if (!platform || !access_token) next(new CERROR("missing token", 401));

  const verifyToken = new VerifyToken(platform, null, access_token);
  console.log(verifyToken);
  const { email } = await verifyToken.verify();
  console.log(email);
  const teacher = new Teacher(email, null, null);
  const teacherExist = await teacher.isExist();
  if (teacherExist) {
    const jsonWebToken = new JsonWebToken(teacherExist);
    const jwt = jsonWebToken.createJwt();
    return res.json({ jwt, profile: "teacher" });
  }
  const student = new Student(email, null, null);

  const studentExist = await student.isExist();
  if (studentExist) {
    console.log("student exist");
    const jsonWebToken = new JsonWebToken(studentExist);
    const jwt = jsonWebToken.createJwt();
    return res.json({ jwt, profile: "student" });
  }

  next();
};
