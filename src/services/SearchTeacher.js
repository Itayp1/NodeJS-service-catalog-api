const mongoose = require("mongoose"),
  Teacher = mongoose.model("Teacher"),
  CError = require("../services/CustomError");

module.exports = class SearchTeacher {
  constructor(city, course) {
    this.city = city;
    this.course = course;
  }
  async getListOfTeachers() {
    const { city, course } = this;
    console.log(city, course);
    const res = await Teacher.find({
      courses: { $in: [course] },
      studyCities: { $in: [city] }
    });
    if (!res) throw new CError("Teachers Not Found", 404);
    return res;
  }
};
