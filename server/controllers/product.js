const Product = require("../models/product");

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
    });
    return res.status(200).json({
      product,
      msg: "Product created Successfully",
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.update_product = async (req, res) => {
  try {
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
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
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
