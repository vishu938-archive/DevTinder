const express = require("express");
const app = express();

// Error handling middleware

app.get("/user/data", (req, res, next) => {
  throw new Error("error while getting data!");
});

app.get("/user/allData", (req, res, next) => {
  // Simulating an error
  try {
    // Simulate fetching all data
    // If an error occurs, it will be caught in the catch block
    throw new Error("Error while fetching all data");
  } catch (err) {
    // res.status(500).send("Error occurred while fetching all data");
    next(err); // Pass the error to the next middleware 
  }
});

// Always place your error-handling middleware after all other app.use() and route calls.
// This ensures any errors thrown or passed with next(err) will be caught and handled properly.

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
