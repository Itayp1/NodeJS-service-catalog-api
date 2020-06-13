const MailService = require("./MailService");
const mailgen = require("../content/ChangeLessonStatus");
const Logger = require("../loaders/looger");

// Generate an HTML email with the provided contents

// eslint-disable-next-line no-unused-vars
module.exports = obj => {

  const { studentName, teacherName, date, time, status, studentEmail } = obj;
  const htmlBody = mailgen(studentName, teacherName, date, time, status);
  const subject = `התקבל עדכון מהמורה Teacher4U`;

  const mailService = new MailService(
    studentEmail,
    subject,
    "heyy there",
    htmlBody
  );
  Logger.info(`changing status of leeson , sending email to ${studentEmail}`);

  mailService.sendEmail();
};
