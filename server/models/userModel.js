// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  wishlist: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    addedAt: { type: Date, default: Date.now }
}]
});

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = async function (inputPassword) {
//   return await bcrypt.compare(inputPassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);
