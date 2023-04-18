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

// @desc delete Category
// @route DELETE /category
// @access Private admin
exports.delete_category = async (req, res) => {
  try {
    const category_id = await Category.findById(req.params.id);
    if (!category_id)
      return res.stats(401).json({ msg: "invalid category id" });
    await Category.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ msg: "category delete successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc query Category
// @route GET /category
// @access public
exports.get_category = async (req, res) => {
  try {
    const categoryId = await Category.findById(req.params.id);
    if (!categoryId) return res.stats(401).json({ msg: "invalid category id" });
    const category = await Category.findById({ _id: req.params.id });
    return res.status(200).json({ category });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

// @desc query Categories
// @route GET /categories
// @access public
exports.get_categories = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(parseInt(limit));
    const count = await Category.find({}).count();
    return res.status(200).json({ categories, count });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
