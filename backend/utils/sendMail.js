const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port:process.env.SMTP_PORT, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.APP_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;