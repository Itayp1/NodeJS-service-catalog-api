/* eslint-disable no-undef */
const expect = require("chai").expect;

const { axiosWithoutToken } = require("./axios");

describe("Test middleware", () => {
  describe("Test the verifyNewUserByToken", () => {
    it("should faild the request without token", async () => {
      try {
        await axiosWithoutToken.post("/api/registration/student", {
          age: 28,
          lastname: "peretz",
          name: "itay",
          gender: "Male",
          city: "ashkelon",
          phone: "0547107691",
          profile: "student"
        });
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });
  });

  describe("Test the verifyRegisteredUserByToken", () => {
    it("should faild the request without token", async () => {
      try {
        await axiosWithoutToken.get("/api/login", {
          age: 28,
          lastname: "peretz",
          name: "itay",
          gender: "Male",
          city: "ashkelon",
          phone: "0547107691",
          profile: "student"
        });
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });
  });
});
