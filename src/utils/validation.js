const validator = require("validator");

const validateData = (req) => {
  const { email, password, firstName, lastName } = req.body;

  if (!firstName || validator.isEmpty(firstName)) {
    throw new Error("First name is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
};

module.exports = { validateData };
