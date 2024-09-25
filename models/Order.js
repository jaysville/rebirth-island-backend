const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    address: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Merch",
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
