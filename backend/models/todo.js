const mongoose = require("mongoose");

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    title: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", TodoSchema);
