const { body } = require("express-validator");
const User = require("../models/User");
const ExpressError = require("./ExpressError");

exports.registerValidator = [
  body("fullName", "Fullname is required.")
    .trim()
    .isLength({ min: 3, max: 250 }),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    //check for uniqueness of email
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        return Promise.reject("A user with that email already exists");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5, max: 12 })
    .withMessage(
      "Passwords must contain between 5 -12 alphanumeric characters"
    ),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new ExpressError("Passwords do not match", 422);
    }
    return true;
  }),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];
