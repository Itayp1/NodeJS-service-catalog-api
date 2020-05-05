/* eslint-disable no-undef */
const mongooseLoader = require("./mongoose"),
  mongoose = require("mongoose"),
  Teacher = mongoose.model("Teacher"),
  Student = mongoose.model("Student"),
  expect = require("chai").expect;

const { axiosGoogleTokenStudent, axiosGoogleTokenTeacher } = require("./axios");

beforeAll(async () => {
  await mongooseLoader();
  await Student.deleteMany({ email: "peretz.itay@gmail.com" });
  await Teacher.deleteMany({ email: "peretz.itay1@cts.info.org.il" });
});

describe("Registration", () => {
  it("should return Student object", async () => {
    const res = await axiosGoogleTokenStudent.post(
      "/api/registration/student",
      {
        age: 28,
        lastname: "peretz",
        name: "itay",
        gender: "Male",
        city: "ashkelon",
        phone: "0547107691",
        profile: "student"
      }
    );

    expect(res.status).to.equal(200);
    expect(res.data).to.include.all.keys("name", "email");
    expect(res.data).to.include({ profile: "student" });
  });

  it("should return Teacher object", async () => {
    const res = await axiosGoogleTokenTeacher.post(
      "/api/registration/teacher",
      {
        age: 28,
        email: "peretz.itay1@cts.info.org.il",
        lastname: "peretz",
        name: "itay",
        gender: "Male",
        city: "ashkelon",
        phone: "0547107691",
        pic: "https://testpic.png",
        courses: ["math", "english"],
        studyCities: ["Tel-aviv", "bat-yam"],
        university: "kyrya lehandesaim",
        generalDescription: "hey i am itay from ashkelon",
        priceAtStudent: 100,
        price: 70,
        availablesDays: ["sunday", "monday"],
        avaiablesHours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        rating: 5,
        profile: "teacher"
      }
    );
    expect(res.status).to.equal(200);
    expect(res.data).to.include.all.keys("name", "email");
    expect(res.data).to.include({ profile: "teacher" });
  });
});
