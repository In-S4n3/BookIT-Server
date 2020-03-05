const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const ZomatoEvent = require("../models/zomato-schema");

// POST route => to create a new event
router.post("/zomato", (req, res, next) => {
  const { name, date, restaurants } = req.body;
  ZomatoEvent.create({
    name,
    date,
    restaurants,
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/zomato", (req, res, next) => {
  ZomatoEvent.find()
    //.populate('tasks')
    .then(allTheZomatoEvents => {
      console.log(allTheZomatoEvents);
      res.json(allTheZomatoEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/zomato/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Our events have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  ZomatoEvent.findById(req.params.id)
    //.populate('tasks')
    .then(event => {
      res.status(200).json(event);
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route => to update a specific project
router.put("/zomato/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  ZomatoEvent.findByIdAndUpdate(req.params.id, req.body)
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
router.delete("/zomato/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  ZomatoEvent.findByIdAndRemove(req.params.id)
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
