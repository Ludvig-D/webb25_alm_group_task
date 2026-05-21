const { default: mongoose } = require('../db/mongoose.js');
const Accommodation = require('./Accommodation.js');

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
        message: 'Invalid email format',
      },
    },
    profileImage: {
      type: String,
      validate: {
        validator: (v) => !v || /^https?:\/\/.+\..+/.test(v),
        message: 'profileImage must be a valid URL',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('remove', async function (next) {
  await Accommodation.deleteMany({ userId: this._id });
  next();
});

userSchema.pre('findOneAndDelete', async function (next) {
  const user = await this.model.findOne(this.getFilter());
  if (user) {
    await Accommodation.deleteMany({ userId: user._id });
  }
  next();
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
