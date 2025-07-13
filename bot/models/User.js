const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  chatId: { type: String, unique: true },
  username: String,
  city: String,
  isBlocked: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
