const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: String,
    name: String,
    email: String,
    city: String,
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
