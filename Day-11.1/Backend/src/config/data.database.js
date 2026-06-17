import mongoose from "mongoose";

const connectToDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to Db`);
};

export default connectToDB;
