const User = require('../models/userModel');
const Product = require('../models/productModel');

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  
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
  