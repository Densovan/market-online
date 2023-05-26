const SubCategory = require("../models/subcategory");
const slugo = require("slugo");

// @desc create Category
// @route POST /category
// @access Private admin
exports.create_subcategory = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const subCategoryName = await SubCategory.findOne({ name });
    if (subCategoryName)
      return res
        .status(401)
        .json({ msg: "This Category name is already exist!" });
    const newSubCategory = await SubCategory.create({
      name,
      categoryId,
      slug: slugo(name),
      user: req.id,
    });
    return res
      .status(200)
      .json({ msg: "category create successfully", newSubCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc update Category
// @route PUT /category
// @access Private admin
exports.update_subcategory = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const subcategory = await SubCategory.findById(req.params.id);
    if (name === category.name)
      return res
        .status(401)
        .json({ msg: "This Category name is already exist!" });
    if (!subcategory)
      return res.status(401).json({ msg: "invalid category id" });
    const newSubCategory = await SubCategory.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        categoryId,
        slug: slugo(name),
        user: req.id,
      }
    );
    return res
      .status(200)
      .json({ msg: "category create successfully", newSubCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc delete Category
// @route DELETE /category
// @access Private admin
exports.delete_subcategory = async (req, res) => {
  try {
    const subcategory_id = await SubCategory.findById(req.params.id);
    if (!subcategory_id)
      return res.stats(401).json({ msg: "invalid category id" });
    await SubCategory.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ msg: "category delete successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc query Category
// @route GET /category
// @access public
exports.get_subcategory = async (req, res) => {
  try {
    const subcategoryId = await SubCategory.findById(req.params.id);
    if (!subcategoryId)
      return res.stats(401).json({ msg: "invalid category id" });
    const subcategory = await SubCategory.findById({ _id: req.params.id });
    return res.status(200).json({ subcategory });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

// @desc query Categories
// @route GET /categories
// @access public
exports.get_subcategories = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const subcategories = await SubCategory.find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(parseInt(limit));
    const count = await SubCategory.find({}).count();
    return res.status(200).json({ subcategories, count });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
