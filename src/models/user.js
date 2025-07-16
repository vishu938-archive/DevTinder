const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

// define a schema for the user
// this schema defines the structure of the user documents in the database.
// SCHEMA LEVEL VALIDATION - with required, minLength, maxLength, custom validators, etc.,
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minLength: 5,
      maxLength: 20,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20,
    },
    age: { type: Number, required: true },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      // validate: {
      //   validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      //   message: "Please enter valid email",
      // },
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please enter valid email",
      },
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 16,
      // validate: {
      //   validator: (value) => /^[a-zA-Z0-9#@]+$/.test(value),
      //   message: "Password can only contain letters, numbers, #, and @",
      // },
      validate(value) {
        return validator.isStrongPassword(value);
      },
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          return ["male", "female"].includes(value.toLowerCase());
        },
        message: "Gender is not valid (must be 'male' or 'female')",
      },
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Please enter a valid URL for photo",
      },
    },
    about: { type: String, default: "This is the default info of the user." },
    skills: { type: [String] },
  },
  { timestamps: true }
);

// create a model from the schema
// this will create a collection named 'users' in the database
const User = mongoose.model("User", userSchema);
module.exports = { User };
