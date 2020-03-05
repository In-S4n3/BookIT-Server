const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zomatoSchema = new Schema({
  name: String,
  date: String,
  restaurant: String
});

const ZomatoEvent = mongoose.model('ZomatoEvent', zomatoSchema);

module.exports = ZomatoEvent;