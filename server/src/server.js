/**
 * Bootstrap file that connects to MongoDB and starts the server.
 * In production/dev usage: `node src/server.js` or `npm run dev`.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-bug-tracker';

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser/useUnifiedTopology are default true in modern mongoose
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

start();
