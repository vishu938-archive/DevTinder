const express = require("express");
const { authMiddleware, userMiddleware } = require("./middleware/auth");
const app = express();

// Middleware to check if the user is authorized for all admin routes under /admin (e.g., /admin/users, /admin/settings)
// GET, POST, PUT, DELETE methods can be used as needed
app.use("/admin", authMiddleware);

// app.get("/admin", (req, res, next) => {
//   res.send("Admin Dashboard");
//   next();
// });

app.get("/admin/users", (req, res) => {
  res.send("Admin Users Page");
});

app.get("/admin/settings", (req, res) => {
  res.send("Admin Settings Page");
});

// as there is only one path for user, we can use the userMiddleware directly
app.get("/user", userMiddleware, (req, res) => {
  res.send("User Profile Page");
});

// for login, there is no need for middleware, so we can directly handle the route.
app.get("/user/login", (req, res) => {
  res.send("User Login Page");
});

app.listen(3000, () => {
  console.log("Connections listening...");
});
