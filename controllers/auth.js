const { validationResult } = require("express-validator");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateWelcomeEmail = require("../utils/generateWelcomeEmail");
const sendEmailToUser = require("../utils/sendEmailToUser");

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 422));
  }

  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ fullName, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const html = generateWelcomeEmail(user.fullName.split(" ")[0]);
    await sendEmailToUser(email, "Welcome To Rebirth Island", html);
    res.status(201).json({
      user: {
        name: user.fullName,
        email,
        isAdmin: user.isAdmin,
        userId: user._id,
      },
      token,
    });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 422));
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ExpressError("User not found", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ExpressError("Incorrect email or password", 401));
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
      user: {
        name: user.fullName,
        email,
        isAdmin: user.isAdmin,
        userId: user._id,
      },
    });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};
