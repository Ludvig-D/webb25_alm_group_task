const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const { default: Accommondation } = require("./Accommondation.js");

const userSchema = new mongoose.Schema(
  {
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

userSchema.pre("remove", async function (next) {
  await Accommondation.findOneAndDelete({ userId: this._id });
  next();
});

module.exports = mongoose.model("User", userSchema);
