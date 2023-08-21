const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: String,
    createAt: String,
  },
  { timestamps: true }
);
const User = mongoose.model("userComment", userSchema);
module.exports = User;
