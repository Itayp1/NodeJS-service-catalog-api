const mongoose = require("mongoose"),
  Teacher = mongoose.model("Teacher"),
  Student = mongoose.model("Student"),
  emitter = require("../subscribers/index");

module.exports = class Registration {
  constructor(userDetails) {
    this.userDetails = userDetails;
    this.userDetails.pic = ""

  }

  async registerAsTeacher() {
    this.userDetails.views = 0;
    const teacher = new Teacher(this.userDetails);
    const res = await teacher.save();
    emitter.emit("user-registered", res);

    return res;
  }

  async registerAsStudent() {
    const student = new Student(this.userDetails);
    const res = await student.save();
    emitter.emit("user-registered", res);

    return res;
  }
};
