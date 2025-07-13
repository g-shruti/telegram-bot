const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  weatherApiKey: String,
  updateTime: String, // "08:00"
});

module.exports = mongoose.model('Settings', SettingsSchema);
