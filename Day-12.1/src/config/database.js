const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log(`Connect to DB`);
  });
}

module.exports = connectToDb;
