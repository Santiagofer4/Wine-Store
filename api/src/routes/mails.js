const express = require("express");
const sendMailRouter = express.Router();
const nodemailer = require("nodemailer");

const transport = {
  //all of the configuration for making a site send an email.
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.THE_EMAIL,
    pass: process.env.THE_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error);
  } else {
    //this means success
    console.log("users ready to mail myself");
  }
});

sendMailRouter.post("/", (req, res, next) => {
  //make mailable object
  const mail = {
    from: process.env.THE_EMAIL,
    to: req.body.email, // EMAIL DEL USUARIO QUE REALIZA LA COMPRA
    subject: "Tu compra a sido confirmada",
    text: "Pronto podrás disfrutar de un buen vino",
  };
  // error handling goes here.
   transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

module.exports = sendMailRouter;
