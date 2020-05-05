const nodemailer = require("nodemailer"),
  Logger = require("../loaders/looger"),
  config = require("../../server.config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS
  }
});

module.exports = class Lessons {
  constructor(to, subject, text, html) {
    this.mailOptions = {
      from: "Teacher4U@Teacher4U.com",
      to,
      subject,
      text,
      html
    };
  }

  sendEmail() {
    transporter.sendMail(this.mailOptions, (err, data) => {
      if (err) {
        Logger.error(err);
        return;
      }
      Logger.info(JSON.stringify(data));
    });
  }
};
