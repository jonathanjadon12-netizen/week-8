import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    mobileNumber: {
      type: Number,
      required: true,
    },
    status:{
        type:Boolean
    }
  },
  { timestamps: true }
);

export const UserModel = model("users", userSchema);