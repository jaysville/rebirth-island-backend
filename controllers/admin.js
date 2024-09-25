const Order = require("../models/Order");
const ExpressError = require("../utils/ExpressError");
const paystack = require("../utils/Paystack");

exports.initializeTransaction = async (req, res, next) => {
  const { email, amount } = req.body;

  try {
    const response = await paystack.initializeTransaction({
      email,
      amount,
    });

    res.status(200).json(response.body);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.verifyTransaction = async (req, res, next) => {
  const { reference } = req.params;

  try {
    const response = await paystack.verifyTransaction({ reference });
    res.status(200).json(response.body);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.getOrders = async (req, res, next) => {
  //admin has right to fulfill an order, only unfulfilled orders will be fetched
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};
