const nodemailer = require('nodemailer');

module.exports = async (prop) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'da3e16003cc04e',
      pass: 'd60ac9fa80e8a0',
    },
  });
  await transporter.sendMail({
    from: 'BIT CYCLES',
    to: prop.email,
    subject: prop.subject,
    text: prop.message,
  });
};
