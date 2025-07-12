const express = require("express");
const app = express();

// app.use("/user", (req, res) => {
//   res.send("gives same response for every request");
// });

// *********** ORDER OF THE ROUTES MATTERS *********** //

// HTTP Methods
app.get("/user", (req, res) => {
  res.send({ firstName: "Vishal", lastName: "Vinayak" });
});

app.post("/user", (req, res) => {
  res.send("User created successfully!");
});

app.delete("/user/id", (req, res) => {
  res.send("User deleted successfully!");
});

// Advanced Routing ...........
// This route will match both /abc and /ac , as b is optional
app.get(/^\/a(b)?c$/, (req, res) => {
  res.send("You have reached /abc or /ac");
});

/**
The route /ab+c in Express matches:
/abc
/abbc
/abbbc
and so on (one or more b between a and c)
 */
app.get(/^\/ab*c$/, (req, res) => {
  res.send("You have reached /ab+c");
});

// this route with regex will match any string that starts with ab and ends with cd
// and can have any characters in between like ab123cd, ab-xyz-cd, etc.
// It will not match abcd or ab-cd
// because there is no character between ab and cd
app.get(/^\/ab.*cd$/, (req, res) => {
  res.send("You have reached ab*cd");
});

// Route parameters
// This route will match /user/123, /user/456, etc.
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});
app.get("/user/:id/:name", (req, res) => {
  console.log(req.params);
});

// Query parameters
// This route will match /user?userId=123, /user?userId=456, etc.
// and will extract the userId from the query string
app.get("/user", (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    return res.send(`User ID from query is ${userId}`);
  }
});

// *********** ORDER OF THE ROUTES MATTERS *********** //

// listen for connections
app.listen(4001, () => {
  console.log("Listening connections...");
});
