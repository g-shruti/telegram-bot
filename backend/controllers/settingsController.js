const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || {});
};

exports.updateSettings = async (req, res) => {
  const existing = await Settings.findOne();
  if (existing) {
    existing.weatherApiKey = req.body.weatherApiKey;
    existing.updateTime = req.body.updateTime;
    await existing.save();
  } else {
    await Settings.create(req.body);
  }
  res.sendStatus(200);
};
