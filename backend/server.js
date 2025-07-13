require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend server running on port ${PORT}`));
