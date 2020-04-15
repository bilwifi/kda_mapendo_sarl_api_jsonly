const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clientKey: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
