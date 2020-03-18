const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/guests", (req, res) => {
  //console.log('teste', req.body);
  let { eName, email, message, name, date, restaurantId, eventID } = req.body;

  //1. Receber nesta rota eventID
  //2. No body email vais ter um link http://localhost:5000/api/acceptInvitation?email=miguelbgomes@gmail.com&eventID=eventID
  //3. Crias outra rota router.post("/acceptInvitation"
  //4. Na rota criada req.param.email req.param.eventID
  //5. Na colecao de eventos crias um atributo que se chama "guests"
  //6. Na rota criada fazes update na colecao eventos dizendo: para o evento com o evento id, adiciona o email ao atributo guests

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Conctat Details<h3/>
    <ul>
      <li>Name: ${req.body.eName}</li>
    </ul>
    <h2>Message<h2/>
    <p>Olá, gostaria muito que estivesses presente no evento abaixo.</p>
    <br/>
    <h5>Name of the Event<h5/>
    <p>${req.body.name}</p>
    <h5>Date of the Event<h5/>
    <p>${req.body.date}</p>
    <h5>Name of the restaurant<h5/>
    <p>${req.body.restaurantId.name}</p>
    <h5>Address of the restaurant<h5/>
    <p>${req.body.restaurantId.location.address}</p>
    <br/>
    <p>${req.body.message}</p>
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
