const express = require("express");
const mongoose = require("mongoose");
const app = express();

// connecting to the database cluster
const DB_CLUSTER_URL =
  "mongodb+srv://NamasteNode:VkHYqmG4AnFOSwKA@nodeatlas.ncwkltq.mongodb.net/";

// connecting to the exact database
const DB_URL =
  "mongodb+srv://NamasteNode:VkHYqmG4AnFOSwKA@nodeatlas.ncwkltq.mongodb.net/devTinder";

// function to connect to the database
// this function returns a promise that resolves when the connection is successful
async function connectDb() {
  await mongoose.connect(DB_URL);
}

module.exports = { connectDb };
