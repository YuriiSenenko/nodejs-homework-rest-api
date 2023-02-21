require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendingVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email, // Change to your recipient
    from: "yuriisenenko@meta.ua", // Change to your verified sender
    subject: "Please, confirm your email adress",
    text: `Please, confirm your email adress, POST http://localhost:3000/users/verify/${verificationToken}`,
    html: `Please <a href="http://localhost:3000/users/verify/${verificationToken}">click here</a> to activate email`,
  };
  await sgMail.send(msg);
};

const sendingConfirmationOfSuccessfulVerification = async (email) => {
  const msg = {
    to: email, // Change to your recipient
    from: "yuriisenenko@meta.ua", // Change to your verified sender
    subject: "Registration info",
    text: "Thank you for registration!",
    html: "<h1>Thank you for registration!</h1>",
  };
  await sgMail.send(msg);
};

module.exports = {
  sendingVerificationEmail,
  sendingConfirmationOfSuccessfulVerification,
};
