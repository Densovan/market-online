const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
