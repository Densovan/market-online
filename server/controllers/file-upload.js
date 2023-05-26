const multer = require("multer");
const sharp = require("sharp");

// @desc upload products
// @route CREATE /upload_product
// @access admin
const upload = multer({ dest: "uploads/" });
exports.upload_product = async (req, res) => {
  try {
    const { path, filename } = req.file;

    //Resiz image using Sharp
    await sharp(path).resize(800, 800).toFile(`uploads/${filename}.jpg`);
    return res.status(200).json({ msg: "upload successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
