const router = require("express").Router(),
  ValidateJwt = require("../../middleware/ValidateJwt"),
  Teacher = require("../../services/Teacher"),
  Student = require("../../services/Student");

require("express-async-errors");

router.put("/update/teacher", ValidateJwt, async ({ body }, res) => {
  // prettier-ignore
  const { email } = res.locals.jwt;
  const teacher = new Teacher(email);
  const result = await teacher.updateInfo(body);
  res.json(result);
});
router.put("/student", ValidateJwt, async ({ body }, res) => {
  const { email } = res.locals.jwt;

  const student = new Student(email);
  const result = await student.updateInfo(body);
  res.json(result);
});
router.put("/replacepic", ValidateJwt, async ({ body }, res) => {
  const { email, profile } = res.locals.jwt;
  const { image } = body;
  let link;
  if (profile == "student") {
    const student = new Student(email);
    link = await student.addPicture(image);
  } else if (profile == "teacher") {
    const teacher = new Teacher(email);
    link = await teacher.addPicture(image);
  }
  res.json({ link });
});

router.get("/teacher", ValidateJwt, async (req, res) => {
  // prettier-ignore
  const email= req.query.email || req.body.email;
  // console.log("teacerrrrrrrrrrr" + body.query);
  const teacher = new Teacher(email);
  const result = await teacher.getInfo();
  res.json(result);
  if (req.query.email) {
    teacher.addView();
  }
});
// eslint-disable-next-line no-unused-vars
router.get("/student", ValidateJwt, async ({ query }, res) => {
  const { email } = res.locals.jwt; // \\ query;
  const student = new Student(email);
  const result = await student.getInfo();
  res.json(result);
});
module.exports = router;
