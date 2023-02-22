const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const initDatabase = require("./startUp/initDatabase.js");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(chalk.blueBright("MongoDB has been connected"));
    app.listen(PORT, () => {
      console.log(chalk.blueBright(`Server has been started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();

module.exports = app;
