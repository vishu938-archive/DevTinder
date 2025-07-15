const express = require("express");
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
const app = express();

// post api to add user to DB.
app.post("/signup", async (req, res) => {
  // creating a new instance of User Model
  const user = new User({
    firstName: "Rocky",
    lastName: "Bhai",
    email: "rocky@gmail.com",
    password: "rocky@123",
    age: 25,
  });

  // almost all DB operations of mongoose are Async 
  try {
    await user.save();
    res.send("User Saved Successfully!");
  } catch (error) {
    res.status(400).send("Error saving user", error.message);
  }
});

// database connection is established before the server starts listening
// this ensures that the server only starts if the database connection is successful.
connectDb()
  .then(() => {
    console.log("DB CONNECTION SUCCESSFUL!");
    app.listen(4000, () => {
      console.log("Ready to listen incoming requests!!!");
    });
  })
  .catch((err) => console.error(err));
