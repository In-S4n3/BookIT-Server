const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../models/event-model');

// POST route => to create a new event
router.post('/events', (req, res, next) => {
  const { name, date, local } = req.body;
  Event.create({
    name,
    date,
    local
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/events', (req, res, next) => {
  Event.find()
    //.populate('tasks')
    .then(allTheEvents => {
      console.log(allTheEvents)
      res.json(allTheEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/events/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // Our events have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Event.findById(req.params.id)
    //.populate('tasks')
    .then(event => {
      res.status(200).json(event);
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route => to update a specific project
router.put('/events/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Event with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route => to delete a specific event
router.delete('/events/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Event with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;