const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  event_name:  String,
  event_desc: String,
  location:   String,
  date: Date,
  createdAt: Date,
  updateAt: Date
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
