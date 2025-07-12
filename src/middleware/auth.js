const authMiddleware = (req, res, next) => {
  const token = "BEARER_TOKENabc";
  const isAdminAuthorized = token === "BEARER_TOKENabc";
  if (!isAdminAuthorized) {
    res.status(401).send("You are not authorized!");
  } else {
    next();
  }
};

const userMiddleware = (req, res, next) => {
  const token = "BEARER_TOKENabc";
  const isAdminAuthorized = token === "BEARER_TOKENabc";
  if (!isAdminAuthorized) {
    res.status(401).send("You are not authorized!");
  } else {
    next();
  }
};

module.exports = { authMiddleware, userMiddleware };
