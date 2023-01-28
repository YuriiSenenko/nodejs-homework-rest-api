const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = { connectMongo };
