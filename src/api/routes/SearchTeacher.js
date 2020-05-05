const router = require("express").Router(),
  SearchTeacher = require("../../services/SearchTeacher");
require("express-async-errors");

router.get("/", async (req, res) => {
  const { city, course } = req.query;
  const searchTeacher = new SearchTeacher(city, course);
  const result = await searchTeacher.getListOfTeachers();
  res.json(result);
});

module.exports = router;
