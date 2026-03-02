const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to DB`);
  } catch (error) {
    console.log(`Error in DB connection ${error}`);
  }
}

module.exports = connectToDB;
