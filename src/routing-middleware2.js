const express = require("express");
const app = express();

// ******** ORDER OF ROUTE HANDLERS MATTERS ******** 

// the job of express is to match the first route handler that matches the request.
// if the first route handler matches, it will not check the next route handler/middleware. it will check all the app.xxx route handlers in the order they are defined.

app.get("/product", (req, res, next) => {
  // Calling next() passes control to the next matching route handler immediately,
  // but res.send("Product Page") still executes and sends the response to the client.
  // If res.send is called before or after next(), the response is sent, and further handlers cannot send another response.
  next();
  res.send("Product Page");
});

// once the response is sent to client, the next route handler will not be executed.because the response is already sent even though next() is called.

app.get("/product", (req, res, next) => {
  console.log("This is the second middleware for /product");
  //   res.send("This is the second response for Product Page");
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
