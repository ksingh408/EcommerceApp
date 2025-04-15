const User = require('../models/userModel');
const Product = require('../models/productModel');

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
console.log(productId);
    // Validate productId and quantity
  if (!productId) {
    return res.status(400).json({ error: 'Invalid product or quantity' });
  }
  
    try {
      const user = await User.findById(req.user.id);
  console.log(user);
      const alreadyInWishlist = user.wishlist.includes(productId);
      if (alreadyInWishlist) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
  
      user.wishlist.push(productId);
      await user.save();
  
      res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  exports.getWishlist = async (req, res) => {
    try {
      // ✅ Fetch the user and populate the wishlist with product details
      const user = await User.findById(req.user.id).populate('wishlist.product');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // ✅ Respond with the populated cart
      res.status(200).json({ wishlist: user.wishlist });
    } catch (err) {
      console.error('Get Wishlist Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };