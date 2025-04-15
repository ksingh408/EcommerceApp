// controllers/adminController.js
const User = require('../models/userModel');
const Product = require('../models/productModel');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } });
  res.json(users);
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
