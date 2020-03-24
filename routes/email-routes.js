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
    hour,
    event_id
  } = req.body;

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <img src="/images/logo.png" alt="BookIT logo"/>
    <p>
      Hi ${req.body.eName}! <br/>
      It would be a pleasure if you accept my invition for the event below. <br/>
      
    </p>
    <h3>Name of the Event<h5/>
    <h5>${req.body.name}</h5>
    <h3>Date of the Event<h5/>
    <h5>${req.body.date}</h5>
    <h3>Time of the Event<h5/>
    <h5>${req.body.hour}</h5>
    <h3>Name of the restaurant<h5/>
    <h5>${req.body.restaurantName}</h5>
    <h3>Address of the restaurant<h5/>
    <h5>${req.body.restaurantAddress}</h5>
    <br/>
    <h5>${req.body.message}</h5>



  Check my <a href="http://book-it-ironhack-2020.s3-website.eu-west-3.amazonaws.com/events/${event_id}">Event</a> to confirm your presence!
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