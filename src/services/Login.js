const axios = require("axios"),
  jwt = require("jsonwebtoken"),
  CERROR = require("./CustomError"),
  config = require("../../server.config");
module.exports = class Login {
  constructor(platform, token, access_token) {
    this.platform = platform;
    this.token = token;
    this.access_token = access_token;
    this.decodedJwt;
    if (platform == "facebook") {
      axios.defaults.baseURL = `${config.OAUTH_FACEBOOK}${token}&access_token=${access_token}`;
    } else if (platform == "google") {
      axios.defaults.baseURL = config.OAUTH_GOOGLE + access_token;
    } else {
      throw new CERROR("invalid platform", 400);
    }
  }

  async verify() {
    try {
      const result = await axios.get();
      if (result.expires_in <= 0) throw new Error("Expire Token", 401);
      return result.data;
    } catch (error) {
      console.log(error.data);
      throw new CERROR("Expire Token", 401);
    }
  }
  async verifygoogle() {
    const { iss, aud } = this.decodedJwt;
    if (iss != "https://accounts.google.com")
      throw new CERROR("invalid Token iis", 401);
    if (aud != config.CLIENT_ID)
      throw new CERROR("invalid Token Client id ", 401);
  }
  decode() {
    this.decodedJwt = jwt.decode(this.token);
    return this.decodedJwt;
  }
};
