// Routes based on strings
const express = require("express");
const app = express();

app.get("/data", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/random.text", (req, res) => {
  res.send("This is a random text response.");
});

// String patterns won't work in express5 , we have use with regex //
// app.get("/ab*cd", (req, res) => {
//   res.send("ab*cd");
// });

// app.get("/ab+cd", (req, res) => {
//   res.send("ab+cd");
// });

// Route paths based on regular expressions 
// this route will match any path that ends with "fly"
app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
