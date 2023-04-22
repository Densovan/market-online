const Product = require("../models/product");
const Category = require("../models/category");
const slug = require("slugo");
// @desc create new product
// @route CREATE /product/create
// @access private
exports.create_product = async (req, res) => {
  const {
    name,
    rating,
    images,
    countInStock,
    price,
    discount,
    category,
    numReviews,
    size,
    color,
    description,
    categorySlug,
  } = req.body;
  try {
    const product = await Product.create({
      name,
      rating,
      images,
      countInStock,
      price,
      discount,
      user: req.id,
      category,
      numReviews,
      size,
      color,
      description,
      categorySlug,
    });
    return res.status(200).json({
      product,
      msg: "Product created Successfully",
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc updatew product
// @route updaste /product/update/id
// @access private
exports.update_product = async (req, res) => {
  try {
    const {
      categorySlug,
      name,
      rating,
      images,
      countInStock,
      price,
      discount,
      category,
      numReviews,
      size,
      color,
      description,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        categorySlug,
        name,
        rating,
        images,
        countInStock,
        price,
        discount,
        user: req.id,
        category,
        numReviews,
        size,
        color,
        description,
      }
    );
    return res.status(200).json({
      product,
      msg: "Product updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc Query all products
// @route GET /products
// @access public
exports.get_products = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(parseInt(limit))
      .populate("category");
    const count = await Product.find({}).count();
    return res.status(200).json({ products, count });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc Query a product
// @route GET /product/:id
// @access public
exports.get_product = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// @desc Query products by CategoryId
// @route GET /product/:categoryId
// @access public
exports.get_product_by_categorySlug = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category })
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(parseInt(limit))
      .populate("category");
    const count = products.length;
    return res.status(200).json({ products, category, count });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
