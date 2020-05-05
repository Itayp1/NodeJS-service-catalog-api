const MailService = require("./MailService");
const mailgen = require("../content/RegistrationHtml");
const Logger = require("../loaders/looger");

// Generate an HTML email with the provided contents

// eslint-disable-next-line no-unused-vars
module.exports = obj => {
  const { email, fullName } = obj;
  const htmlBody = mailgen(fullName);
  const subject = `${fullName} ברוך הבא`;

  const mailService = new MailService(email, subject, "heyy there", htmlBody);
  Logger.info(`new user , dending email to ${email}`);

  mailService.sendEmail();
};
