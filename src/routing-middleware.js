const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("User route accessed");
    next(); // Calls the next middleware or route handler
    // res.send("User route response");
  },
  (req, res, next) => {
    // console.log("2nd user route accessed");
    next();
    // res.send("2nd user route response");
  },
  (req, res, next) => {
    // console.log("3rd user route accessed");
    res.send("3rd user route response");
    next();
  },
  (req, res, next) => {
    console.log("4th user route accessed");
    // res.send("4th user route response");
    // next(); // This will not be called since there is no next route handler
  }
);

// the use of wrapped middleware functions in an array is that it allows you to group multiple middleware functions together for a specific route.
// This can be useful for organizing your code and applying the same set of middleware to multiple routes
app.use(
  "/product",
  [
    (req, res, next) => {
      console.log("Product route accessed");
      next(); // Calls the next middleware or route handler
    },
    (req, res, next) => {
      console.log("2nd product route accessed");
      next(); // Calls the next middleware or route handler
    },
  ],
  (req, res, next) => {
    console.log("3rd product route accessed");
    res.send("Product route response");
  }
);

// Using an array of route handlers. this is not a common pattern in Express, but it can be done.
/*
app.use(
  "/product",
  ["routeHandler1", "routeHandler2"],
  "routeHandler3",
  "routeHandler4"
);

app.use("/product", [
  "routeHandler1",
  "routeHandler2",
  "routeHandler3",
  "routeHandler4",
]);
*/

// listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
