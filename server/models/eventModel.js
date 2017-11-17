const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  event_name:  String,
  event_desc: String,
  location: String,
  date: Date,
  createdAt: Date,
  updateAt: Date,
  member: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
