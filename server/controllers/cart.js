const Cart = require("../models/cart");

// @desc add to cart for user
// @route POST /add_cart
// @access private/user
exports.add_cart = async (req, res) => {
  try {
    const { qty, products } = req.body;
    const carts = await Cart.create({
      qty,
      products,
      user: req.id,
    });
    return res.status(200).json({ carts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc delete cart for user
// @route POST /add_cart
// @access private/user
exports.delete_cart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ msg: "delete successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc query carts for users
// @route POST /add_cart
// @access private/
exports.get_carts = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.id })
      .sort({ createdAt: -1 })
      .populate("products")
      .populate("user");
    return res.status(200).json({ carts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
