const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/guests", (req, res) => {
  console.log(req.body);
  let { name, email, message } = req.body;
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Conctat Details<h3/>
    <ul>
      <li>Name: ${req.body.name}</li>
    </ul>
    <h3>Message<h3/>
    <p>${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "thebookitproject@gmail.com",
        pass: "bookit123456"
      }
    });

    transporter
      .sendMail({
        from: "BookIT",
        to: email,
        subject: "You have an event invitation",
        html: htmlEmail
      })
      .then(info => {
        res.render();
      })
      .catch(error => console.log(error));
  });
});

module.exports = router;
