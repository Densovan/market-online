const Category = require("../models/category");
const slugo = require("slugo");

// @desc create Category
// @route POST /category
// @access Private admin
exports.create_category = async (req, res) => {
  const { name } = req.body;
  try {
    const categoryName = await Category.findOne({ name });
    if (categoryName)
      return res
        .status(401)
        .json({ msg: "This Category name is already exist!" });
    const newCategory = await Category.create({
      name,
      slug: slugo(name),
      user: req.id,
    });
    return res
      .status(200)
      .json({ msg: "category create successfully", newCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc update Category
// @route PUT /category
// @access Private admin
exports.update_category = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (name === category.name)
      return res
        .status(401)
        .json({ msg: "This Category name is already exist!" });
    if (!category) return res.status(401).json({ msg: "invalid category id" });
    const newCategory = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        slug: slugo(name),
        user: req.id,
      }
    );
    return res
      .status(200)
      .json({ msg: "category create successfully", newCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
