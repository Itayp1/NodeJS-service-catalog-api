/* eslint-disable no-undef */
const axios = require("axios");
require("dotenv").config();

const axiosGoogleTokenStudent = axios.create({
  baseURL: "http://localhost:3000",
  headers: { token: process.env.OAUTH_TOKEN_GOOGLE_STUDENT, platform: "google" }
});

const axiosGoogleTokenTeacher = axios.create({
  baseURL: "http://localhost:3000",
  headers: { token: process.env.OAUTH_TOKEN_GOOGLE_TEACHER, platform: "google" }
});

const axiosWithoutToken = axios.create({
  baseURL: "http://localhost:3000",
  headers: { token: process.env.OAUTH_TOKEN_GOOGLE_TEACHER, platform: "google" }
});

module.exports.axiosWithoutToken = axiosWithoutToken;
module.exports.axiosGoogleTokenTeacher = axiosGoogleTokenTeacher;
module.exports.axiosGoogleTokenStudent = axiosGoogleTokenStudent;
