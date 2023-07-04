const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

const indexRouter = require("./routes/index");

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

(async function () {
  await mongoose.connect(mongoDB);
})();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3000/",
      "https://localhost:3000",
      "http://localhost:3000/tv-show-tracker",
    ],
  })
); //issue when deploying?
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);

module.exports = app;
