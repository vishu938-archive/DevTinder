const express = require("express");
const app = express();

// use
// app.use((req, res) =>
//   res.send("RESPOND with same response if any request comes")
// );

app.use("/", (req, res) => res.send("HELLO WORLD!"));
app.use("/test", (req, res) => res.send("HELLO FROM TEST!"));
app.use("/user", (req, res) => res.send("HELLO FROM USER!"));
// app.use("/", (req, res) => res.send("HELLO WORLD!"));

// Listen for connections.
// A node http.Server is returned, with this application (which is a Function) as its callback
app.listen(3000, () => {
  console.log("APP will listen incoming requests at port 3000");
});

/**
 * The problem lies in how `app.use()` works with paths in Express.js:

**`app.use()` matches prefixes.**

  * When you use `app.use("/"`), it means "for any request path that **starts with** `/` (which is literally every path), execute this middleware."
  * Since `/` matches both `/` and `/test`, the first `app.use` handles *all* incoming requests.
  * Once `res.send("HELLO WORLD!")` is called, the response is sent to the client, and the request-response cycle is **terminated**. Express stops processing any further middleware or routes for that request.

**To fix this, you should use `app.get()` (or `app.post()`, etc.) for specific routes:**

`app.get()` specifically matches the exact path (unless you use regular expressions or route parameters).
 */
