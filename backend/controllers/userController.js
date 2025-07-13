const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.sendStatus(404);
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.sendStatus(200);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
};
