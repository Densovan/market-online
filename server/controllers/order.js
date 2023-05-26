const Order = require("../models/order");

// @desc create order
// @route CREATE /create_order
// @access private/
exports.create_order = async (req, res) => {
  try {
    const { orderItems, status } = req.body;
    const orders = await Order.create({
      orderItems,
      user: req.id,
      status,
    });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc update order for users
// @route UPDATE /update_order
// @access private/admin
exports.update_order = async (req, res) => {
  const { name, qty, image, price } = req.body;
  try {
    await Order.updateOne(
      { "orderItems._id": req.params.id },
      {
        $set: {
          "orderItems.$.qty": qty,
          "orderItems.$.name": name,
          "orderItems.$.image": image,
          "orderItems.$.price": price,
        },
      },
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
