const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    const mongoDB = await mongoose.connect(process.env.MONGOOSE_URL);
    if (mongoDB) {
      console.log("Database connection successful");
    }
    return mongoDB;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = { connectMongo };
