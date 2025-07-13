require('dotenv').config();
const mongoose = require('mongoose');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');
const User = require('./models/User');
const Settings = require('./models/Settings');
const getWeather = require('./services/weather');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Mongo connected in cron'));

const startWeatherBroadcast = async () => {
  const settings = await Settings.findOne();
  const users = await User.find({ isBlocked: false });

  if (!settings || !settings.weatherApiKey) {
    console.log('⚠️ No API key set');
    return;
  }

  for (const user of users) {
    const report = await getWeather(user.city, settings.weatherApiKey);
    bot.sendMessage(user.chatId, report);
  }
};

// Run daily at specified time (default: 8 AM)
const schedule = async () => {
  const settings = await Settings.findOne();
  const time = settings?.updateTime || '08:00';
  const [hour, minute] = time.split(':');

  cron.schedule(`${minute} ${hour} * * *`, () => {
    console.log(`⏰ Running weather updates at ${time}`);
    startWeatherBroadcast();
  });
};

// schedule();


cron.schedule('* * * * *', () => {
  console.log('⏰ Sending weather update (test mode)');
  startWeatherBroadcast();
});
