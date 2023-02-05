const mongoose = require("mongoose");
const { DB_HOST } = require("../configuration");

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", process.env.MANGOOSE_STRICT_QUERY);
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = { connectMongo };
