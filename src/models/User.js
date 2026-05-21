import mongoose from "../db/mongoose.js";
import "./Accommodation.js";

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

// Cascade delete: radera alla Accommodation när User raderas
userSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getFilter();
  const userId = filter._id;

  await mongoose.model("Accommodation").deleteMany({ userId });

  next();
});

export default mongoose.model("User", userSchema);
