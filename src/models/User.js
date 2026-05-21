const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: "Invalid email format",
      },
    },
    profileImage: {
      type: String,
      validate: {
        validator: (v) => !v || /^https?:\/\/.+\..+/.test(v),
        message: "profileImage must be a valid URL",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
