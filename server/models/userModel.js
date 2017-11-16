const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  email: String,
  gender: {
    type: String,
    enum:['male', 'female']
  },
  photo_profile: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
