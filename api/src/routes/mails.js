require("dotenv").config();
const express = require("express");
const sendMailRouter = express.Router();
const nodemailer = require("nodemailer");

const transport = {
  // OPCIÓN 1
  //service: "gmail",
  //

  // OPCIÓN 2
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  //
  auth: {
    user: process.env.THE_EMAIL,
    pass: process.env.THE_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transport);

// Para registro, para confirmar compra, cambio de password, promovido

sendMailRouter.post("/", (req, res) => {
  let { subject, name, email, text } = req.body;
  let mail = {
    from: process.env.THE_EMAIL,
    to: email,
    subject: subject,
    text: `
    Hola, ${name}.

    ${text}`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("NO se ha enviado el mail", err);
    } else {
      console.log("Se ha enviado el mail");
    }
  });
});

module.exports = sendMailRouter;
