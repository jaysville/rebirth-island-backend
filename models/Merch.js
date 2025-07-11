const mongoose = require("mongoose");
const { Schema } = mongoose;

const merchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  soldout: { type: Boolean, required: true },
});

module.exports = mongoose.model("Merch", merchSchema, "merch");
