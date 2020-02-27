const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: String,
  local: String,
  // owner will be added later on
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;