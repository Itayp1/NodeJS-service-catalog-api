const MailService = require("./MailService");
const mailgen = require("../content/AproveNewService");
const Logger = require("../loaders/looger");
// Generate an HTML email with the provided contents

// eslint-disable-next-line no-unused-vars
module.exports = ({ _id, aprovmentUrl, ...obj }) => {
  aprovmentUrl = `${aprovmentUrl}/${_id}`
  const props = { ...obj, aprovmentUrl };
  const htmlBody = mailgen(props);
  const subject = `בקשה לאישור שירות חדש`;

  const mailService = new MailService("peretz.itay@gmail.com", subject, "", htmlBody);
  Logger.info(`new Service , dending email to ${'peretz.itay@gmail.com'}`);

  mailService.sendEmail();
};
