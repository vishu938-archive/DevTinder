const express = require("express");
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
const app = express();

// Use express.json() middleware to parse incoming JSON requests and populate it into req.body. This is required before defining routes that expect JSON data.
// this will be applied to all incoming requests, the middleware will convert the incoming request body from JSON format into a JavaScript object, which can then be accessed via `req.body`.
// Without this middleware, `req.body` would be undefined for requests with a JSON payload.
app.use(express.json());

// post api to add user to DB.
app.post("/signup", async (req, res) => {
  // creating a new instance of User Model
  const user = new User(req.body);

  // almost all mongoose operations return a promise, so we can use async/await to handle the asynchronous nature of the operation.
  try {
    await user.save();
    res.send("User Saved Successfully!");
  } catch (error) {
    res.status(400).send("Error saving user", error.message);
  }
});

// get api to find single user
app.get("/user", async (req, res) => {
  const userEmail = req.body.email.trim().toLowerCase();

  try {
    // const users = await User.find({ email: userEmail });
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }

    // if (users.length > 0) {
    //   res.send(users);
    // } else {
    //   res.status(404).send("User Not Found");
    // }
  } catch (err) {
    res.status(400).send("Error fetching data ", err.message);
  }
});

// find all the users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(400).send("Error fetching data ", err.message);
  }
});

// find user by id
app.get("/find-user", async (req, res) => {
  const userId = req.query.id;
  console.log("userid", userId);

  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!", err.message);
  }
});

// delete the user by ID
app.delete("/delete-user", async (req, res) => {
  const userId = req.query.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// update user using PATCH
app.patch("/user", async (req, res) => {
  const userId = req.query.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error updating the user", err);
  }
});

app.patch("/update-user-email", async (req, res) => {
  const email = req.query.email;

  try {
    const user = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error updating the user email", err);
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
