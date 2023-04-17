const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    images: {
      type: [String],
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    numReviews: {
      type: Number,
      required: false,
    },
    size: {
      type: [String],
    },
    color: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
