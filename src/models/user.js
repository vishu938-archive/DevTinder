const mongoose = require("mongoose");
const { Schema } = mongoose;

// define a schema for the user
// this schema defines the structure of the user documents in the database
const userSchema = new Schema({
  firstName: { type: String },
  lastName: String,
  age: Number,
  email: String,
  password: String,
  gender: String,
});

// create a model from the schema
// this will create a collection named 'users' in the database
const User = mongoose.model("User", userSchema);
module.exports = { User };
