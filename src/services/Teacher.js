const User = require("./User"),
  mongoose = require("mongoose"),
  TeacherQuery = mongoose.model("Teacher"),
  TimeTable = mongoose.model("TimeTable"),
  _ = require("lodash");
mongoose.set("useFindAndModify", false);
const uploadPic = require("./uploadPicture");
class Teacher extends User {
  // prettier-ignore
  constructor(email, fullnName, age, gender, city, phone, profile, pic, courses, studyCities, university, generalDescription, priceAtStudent, price, availablesDays, avaiablesHours, rating 
  ) {
    super(email, fullnName, age, gender, city, phone, profile);
     this.pic = pic,
      this.courses = courses,
      this.studyCities = studyCities,
      this.university = university,
      this.generalDescription = generalDescription,
      this.priceAtStudent = priceAtStudent,
      this.price = price,
      this.availablesDays = availablesDays,
      this.avaiablesHours = avaiablesHours,
      this.rating = rating;
      this.views = 0;

  //    console.log(this);

  }

  async isExist() {
    const { email } = this;
    console.log(email);
    const isExist = await TeacherQuery.findOne({ email });
    if (isExist) {
      return isExist;
    } else {
      return false;
    }
  }

  async getAvaiableTime(date) {
    const { email } = this;
    const {
      avaiablesHours,
      availablesDays: availablesDaysinNum
    } = await TeacherQuery.findOne({
      email
    });
    const sceDate = (new Date(date).getDay() + 1).toString();
    const days = {
      "0": "0",
      ראשון: "1",
      שני: "2",
      שלישי: "3",
      רביעי: "4",
      חמישי: "5",
      שישי: "6",
      שבת: "7"
    };
    const availablesDays = availablesDaysinNum.map(day => days[day]);

    if (!availablesDays.includes(sceDate)) {
      return [];
    }

    let takenLessons = await TimeTable.find({
      teacherEmail: this.email,
      date
    });
    // console.log("takenLessons" + takenLessons);

    takenLessons = takenLessons.map(({ time }) => time);

    const avaiables = avaiablesHours.filter(
      houer => !takenLessons.includes(parseInt(houer))
    );

    return { avaiables, availablesDays };
  }

  async updateInfo(details) {
    let obj = {};
    for (let key in details) {
      key != "email" && key != "pic" ? (obj[key] = details[key]) : null;
    }
    console.log(this.email);
    let result = await TeacherQuery.findOneAndUpdate(
      { email: this.email },
      {
        $set: obj
      }
    );
    console.log(result);
    _.assign(result, obj);
    return result;
  }
  async getInfo() {
    const result = await TeacherQuery.findOne({ email: this.email });
    return result;
  }
  addView() {
    TeacherQuery.findOneAndUpdate({ email: this.email }, { $inc: { views: 1 } })
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  }
  async addPicture(img) {
    const pic = await uploadPic(img);
    await TeacherQuery.findOneAndUpdate({ email: this.email }, { pic });
    return pic;
  }
}

module.exports = Teacher;
