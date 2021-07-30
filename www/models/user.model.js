import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true,
      },
    },
    alive: Boolean,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
