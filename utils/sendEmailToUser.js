const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rebirthisland7@gmail.com",
    pass: process.env.GMAIL_AUTH_PASS,
  },
});

const sendEmailToUser = (userEmail, subject, html) => {
  return new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from: "RebirthIsland7@gmail.com",
        to: userEmail,
        subject,
        html,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = sendEmailToUser;
