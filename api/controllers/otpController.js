const express = require("express");
const router = express.Router();
require("dotenv").config();
const Otp = require("../models/Otp");
const User = require("../models/User");
const { transporter, randomNumber } = require("../utils/nodemailer/nodemailer");

router.post("/sendMail", async (request, response) => {
  const { email, name } = request.body;
  // response.json({email, otp})
  const otp = randomNumber();
  const newOtp = new Otp({ email, otp });
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Registration or verification",
    text: `Hi ${name},\n Please use this code to register. \n Code - ${otp}`,
  };
  const isUserExist = await User.findOne({ email });
  const isEmailExist = await Otp.findOne({ email });
  if (isUserExist) {
    response.status(404).send({ error: "User already exists" });
  } else {
    if (isEmailExist) {
      await Otp.findOneAndUpdate({ email: email }, { otp: otp });
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          response.send({ message: "Otp sent successfully" });
        }
      });
    } else {
      await newOtp.save();
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          response.send({ message: "Otp sent successfully" });
        }
      });
    }
  }
});

router.post("/verifyOtp", async (request, response) => {
  const { email, otp } = request.body;
  const isEmailExist = await Otp.findOne({ email });
  if (isEmailExist) {
    if (isEmailExist.otp === otp) {
      response.send({ message: "validation successfull" });
    } else {
      response.status(500).send({ error: "Wrong OTP!" });
    }
  } else {
    response
      .status(500)
      .send({
        error:
          "Unable to verify the Email.\n Please reach out to the admin at sbssunu1@gmail.com",
      });
  }
});

module.exports = router;
