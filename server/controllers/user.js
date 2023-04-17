const User = require("../models/user");

// @desc query all users
// @route GET/users
// @access private
exports.get_users = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(parseInt(limit));
    const count = await User.find({}).count();
    return res.status(200).json({ users, count });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

// @desc query profile
// @route GET/user/:id
// @access private
exports.get_user = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (user) {
      return res.status(200).json({ user });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
