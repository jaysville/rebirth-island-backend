const Order = require("../models/Order");
const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");
const generateAdminOrderConfirmation = require("../utils/generateAdminOrderConfirmation");
const generateOrderConfirmationEmail = require("../utils/generateOrderConfirmationEmail");

const crypto = require("crypto");
const sendEmailToUser = require("../utils/sendEmailToUser");
const generateResetEmail = require("../utils/generateResetEmail");
const bcrypt = require("bcrypt");

exports.placeOrder = async (req, res, next) => {
  const {
    email,
    phone,
    address,
    firstName,
    lastName,
    landmark,
    city,
    state,
    products,
    totalAmount,
  } = req.body;
  let userId;

  try {
    const user = await User.findOne({ email });
    if (user) {
      userId = user._id;
    } else {
      userId = null;
    }

    const order = new Order({
      email,
      phone,
      userId,
      address,
      fullName: `${firstName} ${lastName}`,
      landmark,
      city,
      state,
      products,
      totalAmount,
    });

    await order.save();

    const html = generateOrderConfirmationEmail(order);
    const adminContent = generateAdminOrderConfirmation(order);

    await sendEmailToUser(email, "Order Confirmation", html);
    await sendEmailToUser(
      "olaotanabarowei@gmail.com",
      "You recieved an order",
      adminContent
    );

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email });

    if (!orders) return next(new ExpressError("No orders found", 404));
    res.status(200).json(orders);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ExpressError("User not found", 404));

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const html = generateResetEmail(user);

    await sendEmailToUser(email, "Reset Your Password", html);
    res
      .status(200)
      .json({ message: "Reset link has been sent to your email." });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return next(
        new ExpressError("Password reset token is invalid or has expired.", 400)
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordExpires = null;
    user.resetPasswordToken = null;

    await user.save();
    res.status(200).json({ message: "Password has been updated." });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};
