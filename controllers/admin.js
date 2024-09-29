const Order = require("../models/Order");
const ExpressError = require("../utils/ExpressError");
const generateDeliveredEmail = require("../utils/generateDeliveredEmail");
const paystack = require("../utils/Paystack");
const sendEmailToUser = require("../utils/sendEmailToUser");

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
  try {
    const orders = await Order.find().select(
      "fullName totalAmount status createdAt "
    );

    res.status(200).json(orders);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.getSingleOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return next(new ExpressError("Order not found", 404));
    res.status(200).json(order);
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return next(new ExpressError("Order not found", 404));

    order.status = status;
    await order.save();

    if (order.status === "Delivered") {
      const html = generateDeliveredEmail(order);
      await sendEmailToUser(order.email, "Thanks for shopping with us", html);
    }
    res.status(200).json({ message: "Status Updated", order });
  } catch (e) {
    next(new ExpressError(e.message, 500));
  }
};
