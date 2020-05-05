/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use strict";
const nodemailer = require("nodemailer");
/* eslint no-console: 0 */
const Mailgen = require("mailgen");

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Teacher4U",
    link: "https://i.ibb.co/YNsNTY5/logo.png",
    // Optional product logo
    logo: "https://i.ibb.co/YNsNTY5/logo.png"
  }
});

var email = {
  body: {
    name: "John Appleseed",
    intro: "Welcome to Mailgen! We're versy excited to have you on board.",
    action: {
      instructions: "To get started with Mailgen, please click here:",
      button: {
        color: "#22BC66", // Optional action button color
        text: "Confirm your account",
        link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010"
      }
    },
    outro:
      "Need help, or have questions? Just reply to this email, we'd love to help."
  }
};

// Generate an HTML email with the provided contents
var emailBody = mailGenerator.generate(email);

// Generate the plaintext version of the e-mail (for clients that do not support HTML)
var emailText = mailGenerator.generatePlaintext(email);

// Optionally, preview the generated HTML e-mail by writing it to a local file
require("fs").writeFileSync("preview.html", emailBody, "utf8");

// `emailBody` now contains the HTML body,
// and `emailText` contains the textual version.
//
// It's up to you to send the e-mail.
// Check out nodemailer to accomplish this:
// https://nodemailer.com/

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  auth: {
    user: process.env.EMAIL || "92c6abdf6285e25b3651a7d30506e55c",
    pass: process.env.PASSWORD || "c129fcf25e2c12a8995526ecebc9efbf"
  },
  port: 587
});

let mailOptions = {
  from: "Teacher4U@Teacher4U.com",
  to: "peretz.itay@gmail.com",
  subject: "ברוך הבא",
  text: "Wooohooo it works!!",
  html: "<p>pppppp</p>" // html body emailBody
};

const temp = {
  from: "Teacher4U@Teacher4U.com",
  to: "peretz.itay@gmail.com",
  subject: "itay ברוך הבא",
  text: "heyy there",
  html: "<p>dsfdsf</p>"
};

transporter.sendMail(temp, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(data));
});
