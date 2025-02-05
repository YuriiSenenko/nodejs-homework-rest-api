const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { errorHandler } = require("./helpers/apiHelpers");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use(errorHandler);

module.exports = app;
