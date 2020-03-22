const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();



// Route to send Emails
router.post("/sendEmail", (req, res) => {

  //console.log('teste', req.body);
  let {
    eName,
    email,
    message,
    name,
    date,
    restaurantName,
    restaurantAddress,
    hour
  } = req.body;

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <img src="/images/logo.png" alt="BookIT logo"/>
    <p>
      Hi ${req.body.eName}! <br/>
      It would be a pleasure if you accept my invition for the event below. <br/>
      
    </p>
    <h4>Name of the Event<h5/>
    <p>${req.body.name}</p>
    <h4>Date of the Event<h5/>
    <p>${req.body.date}</p>
    <h4>Time of the Event<h5/>
    <p>${req.body.hour}</p>
    <h4>Name of the restaurant<h5/>
    <p>${req.body.restaurantName}</p>
    <h4>Address of the restaurant<h5/>
    <p>${req.body.restaurantAddress}</p>
    <br/>
    <p>${req.body.message}</p>

    Please, check the <a href="http://book-it-ironhack-2020.s3-website.eu-west-3.amazonaws.com/">Event</a> to confirm your presence!
    `;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "thebookitproject@gmail.com",
        pass: "bookit123456"
      }
    });

    transporter
      .sendMail({
        from: "BookIT",
        to: email,
        subject: "You have an event invitation!",
        html: htmlEmail
      })
      .then(info => {
        res.render();
      })
      .catch(error => console.log(error));
  });
});

module.exports = router;