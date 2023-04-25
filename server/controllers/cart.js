const Cart = require("../models/cart");

// @desc add to cart for user
// @route POST /add_cart
// @access private/user
exports.add_cart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const carts = await Cart.create({
      cartItems,
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
      .populate("user")
      .populate("cartItems.product");
    return res.status(200).json({ carts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc update cart qty for users
// @route PUT /update_cart
// @access private/
exports.update_cart_qty = async (req, res) => {
  const { qty } = req.body;
  try {
    await Cart.updateOne(
      // {
      //   cartItems: { $elemMatch: { _id: req.params.id } },
      // },
      {
        "cartItems._id": req.params.id,
      },
      { $set: { "cartItems.$.qty": qty } },
      {
        acknowledged: true,
        insertedId: null,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
      }
    );
    return res.status(200).json({ msg: "update successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
