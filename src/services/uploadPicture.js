const axios = require("axios");
const conf = require("../../server.config");
const url = "https://api.imgur.com";

const apiGur = axios.create({
  baseURL: url,
  headers: {
    Authorization: conf.APIGURID
  }
});

const uploadPicture = async image => {
  const response = await apiGur.post("/3/upload", {
    image
  });
  return response.data.data.link;
};

module.exports = uploadPicture;
