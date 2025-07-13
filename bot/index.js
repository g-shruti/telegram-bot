require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const User = require('./models/User');
const Settings = require('./models/Settings');
const getWeather = require('./services/weather');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Connect DB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ MongoDB connected'));

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Welcome! Use /subscribe <city> to get daily weather updates.\nUse /unsubscribe to stop.");
});

// /subscribe <city>
bot.onText(/\/subscribe (.+)/, async (msg, match) => {
  const city = match[1];
  const chatId = msg.chat.id;

  const user = await User.findOne({ chatId });
  if (user?.isBlocked) return bot.sendMessage(chatId, "🚫 You are blocked.");

  await User.updateOne(
    { chatId },
    {
      chatId,
      username: msg.from.username || msg.from.first_name,
      city,
      isBlocked: false
    },
    { upsert: true }
  );

  bot.sendMessage(chatId, `✅ Subscribed for weather updates in ${city}`);
});

// /unsubscribe
bot.onText(/\/unsubscribe/, async (msg) => {
  await User.deleteOne({ chatId: msg.chat.id });
  bot.sendMessage(msg.chat.id, `❌ You have been unsubscribed.`);
});
