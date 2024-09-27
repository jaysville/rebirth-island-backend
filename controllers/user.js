const Order = require("../models/Order");
const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");
const paystack = require("../utils/Paystack");

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
    //send email confirming order and ish
    //email rebirth that a new order has been placed and shit
    res.status(200).json({ message: "Order placed successfully", order });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};
