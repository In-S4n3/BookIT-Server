const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: String,
  hour: String,
  restaurantName: String,
  restaurantAddress: String,
  guests: String,
  owner: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
