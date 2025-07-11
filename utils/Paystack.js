const Paystack = require("paystack-node");

const environment = process.env.NODE_ENV;

const isProduction = process.env.NODE_ENV === "production";

const paystackKey = isProduction
  ? process.env.PAYSTACK_SECRET_KEY_LIVE
  : process.env.PAYSTACK_SECRET_KEY_TEST;

const paystack = new Paystack(paystackKey, environment);

module.exports = paystack;
