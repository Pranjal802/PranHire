import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiresAt: {
    type: Date,
  },
  VarificationToken: {
    type: String,
  },
  VarificationExpiresAt: {
      type: Date,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
