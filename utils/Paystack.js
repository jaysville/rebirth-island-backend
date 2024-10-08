const Paystack = require("paystack-node");

const environment = process.env.NODE_ENV;

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY, environment);

module.exports = paystack;
