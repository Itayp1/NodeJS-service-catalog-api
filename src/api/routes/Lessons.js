const router = require("express").Router(),
  GetAvaiableTime = require("../../services/Teacher"),
  ValidateJwt = require("../../middleware/ValidateJwt"),
  Lesson = require("../../services/Lessons");

require("express-async-errors");

router.get("/getavaiabletime", ValidateJwt, async (req, res) => {
  const { email, date } = req.query;
  const getAvaiableTime = new GetAvaiableTime(email);
  const result = await getAvaiableTime.getAvaiableTime(date);
  res.json(result);
});

router.post(
  "/appointmentLesson",
  ValidateJwt,

  async (req, res) => {
    const {
      teacherEmail,
      teacherName,
      cource,
      date,
      time,
      studentName
    } = req.body;
    const { email: studentEmail, phone } = res.locals.jwt;
    console.log(studentEmail, studentName);
    const lesson = new Lesson(
      teacherEmail,
      teacherName,
      studentEmail,
      studentName,
      cource,
      date,
      time,
      "waiting"
    );
    const result = await lesson.appointmentLesson(phone);
    res.json(result);
  }
);

router.get("/timetable", ValidateJwt, async ({ body }, res) => {
  const email = body.query || body.email;
  const { profile } = res.locals.jwt;
  console.log(email, profile);
  const timeTable = new Lesson(email);

  let result = await timeTable.getTimeTable(email, profile);
  res.json({ timeTable: result });
});

router.put("/timetable", ValidateJwt, async ({ body }, res) => {
  const { id, status } = body;
  const timeTable = new Lesson();

  const result = await timeTable.updateTimeTable(id, status);
  console.log(result);
  res.json({ updated: result });
});
module.exports = router;
