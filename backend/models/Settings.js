const mongoose = require('mongoose');

const modelName = 'Settings';
if (mongoose.models[modelName]) {
  module.exports = mongoose.model(modelName);
} else {
  const SettingsSchema = new mongoose.Schema({
    weatherApiKey: String,
    updateTime: String, // "08:00"
  });
  module.exports = mongoose.model(modelName, SettingsSchema);
}
