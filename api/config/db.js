const mongoose = require('mongoose');
require('dotenv').config()

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log(`Connected to database successfully`))
    .catch((err) => {
      console.log(`DB connection failed`);
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;