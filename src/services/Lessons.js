const mongoose = require("mongoose"),
  TimeTable = mongoose.model("TimeTable"),
  emitter = require("../subscribers/index");

module.exports = class Lessons {
  constructor(
    teacherEmail,
    teacherName,
    studentEmail,
    studentName,
    cource,
    date,
    time,
    status,
    name
  ) {
    this.teacherEmail = teacherEmail;
    this.teacherName = teacherName;
    this.studentEmail = studentEmail;
    this.studentName = studentName;
    this.cource = cource;
    this.date = date;
    this.time = time;
    this.status = status;
    this.name = name;
    this.hasReview = false;
  }

  async appointmentLesson(phone) {
    const timeTable = new TimeTable(this);
    const result = await timeTable.save();
    result.phone = phone
    const {
      status,
      teacherEmail: email,
      teacherName: name,
      date,
      time,
      cource,
      _id: id
    } = result;

    const resultRefact = {
      status,
      email,
      name,
      date,
      time,
      cource,
      id
    };
    emitter.emit("teacher-apointmentLesson", result);

    return resultRefact;
  }
  async getTimeTable(email, profile) {
    if (profile == "student") {
      let timeTable = await TimeTable.find({ studentEmail: email });
      const mapResult = timeTable.map(tmp => {
        const obj = {};
        (obj.status = tmp.status),
          (obj.email = tmp.teacherEmail),
          (obj.name = tmp.teacherName),
          (obj.date = tmp.date),
          (obj.time = tmp.time);
        obj.id = tmp.id;
        obj.hasReview = tmp.hasReview;
        obj.studentName = tmp.studentName;
        obj.cource = tmp.cource;

        return obj;
      });

      console.log(mapResult);
      return mapResult;
    } else if (profile == "teacher") {
      let timeTable = await TimeTable.find({ teacherEmail: email });
      const mapResult = timeTable.map(tmp => {
        const obj = {};
        (obj.status = tmp.status),
          (obj.email = tmp.teacherEmail),
          (obj.name = tmp.studentName),
          (obj.date = tmp.date),
          (obj.time = tmp.time);
        obj.id = tmp.id;
        obj.cource = tmp.cource;

        return obj;
      });
      return mapResult;
    }
    throw new Error("unknoun Profile");
  }

  async updateTimeTable(_id, status) {
    const timeTable = await TimeTable.findByIdAndUpdate({ _id }, { status });
    timeTable.status = status;
    emitter.emit("teacher-changestatus", timeTable);
    return timeTable;
  }
};
