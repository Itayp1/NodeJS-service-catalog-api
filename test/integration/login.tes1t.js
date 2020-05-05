/* eslint-disable no-undef */
const expect = require("chai").expect;

const { axiosGoogleTokenTeacher, axiosGoogleTokenStudent } = require("./axios");

describe("Test Login", () => {
  describe("GET /login", () => {
    it("should return teacher profile", async () => {
      const res = await axiosGoogleTokenTeacher.get("/api/login");
      expect(res.status).to.equal(200);
      expect(res.data).to.include({ profile: "teacher" });
    });
  });
  describe("GET /login", () => {
    it("should return student profile", async () => {
      const res = await axiosGoogleTokenStudent.get("/api/login");
      expect(res.status).to.equal(200);
      expect(res.data).to.include({ profile: "student" });
    });
  });
});
