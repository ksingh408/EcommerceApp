const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  inStock: { type: Boolean, default: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
