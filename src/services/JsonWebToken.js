/* eslint-disable no-undef */
const jwt = require("jsonwebtoken"),
  fs = require("fs"),
  privateKey = fs.readFileSync(__dirname + "/../security/private.key"),
  cert = fs.readFileSync(__dirname + "/../security/public.pem"); // get public key

module.exports = class JsonWebToken {
  constructor(obj) {
    this.obj = obj;
  }

  createJwt() {
    const token = jwt.sign(JSON.stringify(this.obj), privateKey, {
      algorithm: "RS256"
    });
    return token;
  }

  verifyJwt() {
    const response = jwt.verify(this.obj, cert);
    return response;
  }
};
