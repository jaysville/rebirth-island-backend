const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.isAdmin === false) {
      return next(new ExpressError("You are not an admin", 403));
    }
    next();
  } catch (err) {
    next(new ExpressError(err.message, 500));
  }
};
