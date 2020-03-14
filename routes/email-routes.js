const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();


router.post('/guests', (req, res) => {
  console.log(req.body)
})




module.exports = router;