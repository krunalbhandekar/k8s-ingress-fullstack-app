const mongoose = require("mongoose");

const dbInit = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
      process.exit(1);
    });
};

module.exports = dbInit;
