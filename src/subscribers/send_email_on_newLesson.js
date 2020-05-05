const MailService = require("./MailService");
const mailgen = require("../content/ApointmenNewtLesson");
const Logger = require("../loaders/looger");

// Generate an HTML email with the provided contents

// eslint-disable-next-line no-unused-vars
module.exports = obj => {
  const { teacherName, studentName, date, time, teacherEmail, phone } = obj;
  const htmlBody = mailgen(teacherName, studentName, date, time, phone);
  const subject = `  נקבע עבורך שיעור חדש - Teacher4U`;

  const mailService = new MailService(
    teacherEmail,
    subject,
    "heyy there",
    htmlBody
  );
  Logger.info(`new lesson , sending email to ${teacherEmail}`);

  mailService.sendEmail();
};
