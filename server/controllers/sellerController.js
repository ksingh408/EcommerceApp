

const Product = require('../models/productModel');

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const sellerId = req.user.id;

    console.log(sellerId);
console.log(req.user);

    const product = await Product.create({ name, price, description, image, seller: sellerId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id, seller: req.user.id });

    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Get seller's products
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching seller products' });
  }
};
