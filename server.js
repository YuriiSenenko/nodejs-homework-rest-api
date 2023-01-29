const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;
const { connectMongo } = require("./db/connection");

async function start() {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}
start();
