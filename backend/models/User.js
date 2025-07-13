const mongoose = require('mongoose');

const modelName = 'User';
if (mongoose.models[modelName]) {
  module.exports = mongoose.model(modelName);
} else {
  const UserSchema = new mongoose.Schema({
    chatId: String,
    username: String,
    city: String,
    isBlocked: { type: Boolean, default: false },
  });
  module.exports = mongoose.model(modelName, UserSchema);
}
