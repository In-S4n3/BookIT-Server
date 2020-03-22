const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const addCorsHeaders = require('./cors-add-resp-headers.js');
require('dotenv').config();


const Event = require("../models/event-model");
const Invitation = require("../models/invitation-model");

const admin = require("firebase-admin");



const fbase_cert = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVEIDER_x509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_x509_CERT_URL,
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(fbase_cert))),
  databaseURL: "https://bookit-ad3fd.firebaseio.com"
});

// POST route => TO CREATE A NEW EVENT
router.post("/events", (req, res, next) => {

  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then(decodedToken => {
        // console.log('decoded token', decodedToken);
        const {
          name,
          date,
          hour,
          restaurantName,
          restaurantAddress,
          guests
        } = req.body;
        Event.create({
            name,
            date,
            hour,
            restaurantName,
            restaurantAddress,
            guests,
            owner: decodedToken.uid
          })
          .then(response => {
            res.json(response);
          })
          .catch(err => {
            res.json(err);
          });
      })
      .catch(() => {
        res.status(403).json({
          message: "Unauthorized"
        });
      });
  } else {
    res.status(403).json({
      message: "Unauthorized"
    });
  }
});

// GET route => TO GET THE EVENTS
router.get("/events", (req, res, next) => {

  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (req.headers.authorization) {

    admin.auth().verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {

        Event.find({
            owner: decodedToken.uid
          })
          .then(allTheEvents => {

            res.json(allTheEvents);
          })
          .catch(err => {
            res.json(err);
          });
      });
  }
});

// GET route => TO GET INSIDE AN EVENT
router.get("/events/:id", (req, res, next) => {
  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }
  Event.findById(req.params.id)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(error => {
      res.json(error);
    });
});

// GET route => TO GET INSIDE AN EVENT - INVITATIONS
router.get("/invitation/:event_id", (req, res, next) => {
  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (!mongoose.Types.ObjectId.isValid(req.params.event_id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }
  Invitation.find({
      event_id: req.params.event_id
    })
    .then(event => {
      res.status(200).json(event);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
});

// expected json (req.body): 
// { event_id: 'xyz', email: 'tiago@gmail.com' }
router.post("/invitation/", (req, res, next) => {
  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  Invitation.create({
      event_id: req.body.event_id,
      email: req.body.email,
      attending: false,
    })
    .then(response => res.json(response))
    .catch(error => res.json(error));
});

// PUT route => TO EDIT/UPDATE AN EVENT - INVITATIONS
// expected header: 
// { Authorization: <encoded JWT token> }
// expected json (req.body): 
// { invitation_id: 'xyz', attending: 'true' }
router.put("/invitation/", (req, res, next) => {
  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (!mongoose.Types.ObjectId.isValid(req.body.invitation_id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }
  Event.findByIdAndUpdate(req.body.invitation_id, {
      attending: req.body.attending
    })
    .then(() => {
      res.json({
        message: `Invite id: ${req.params.id} is was set to ${req.body.attending}.`
      });
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route => TO EDIT/UPDATE AN EVENT
router.put("/events/:id", (req, res, next) => {
  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Event with ${req.params.id} is updated successfully.`
      });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route => to delete a specific event
router.delete("/events/:id", (req, res, next) => {
  res = addCorsHeaders(res)
  res.status(200).json(thingsFromDB)
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }
  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Event with ${req.params.id} is removed successfully.`
      });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;