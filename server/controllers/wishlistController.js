const User = require('../models/userModel');
const Product = require('../models/productModel');
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const user = await User.findById(req.user.id);

    const alreadyInWishlist = user.wishlist.some(
      (item) => item.product === productId
    );

    if (alreadyInWishlist) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push({
      product: productId,
      addedAt: new Date()
    });

    await user.save();

    const updatedUser = await User.findById(req.user.id).populate('wishlist.product');

    res.status(200).json({
      message: 'Product added to wishlist',
      wishlist: updatedUser.wishlist  // ✅ Populated response
    });
  } catch (err) {
    console.error("Wishlist error:", err);
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

  console.log("Populated Wishlist:", user.wishlist); 
      // ✅ Respond with the populated cart
      res.status(200).json({ wishlist: user.wishlist });
    } catch (err) {
      console.error('Get Wishlist Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };




  exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    
     console.log('Product ID to remove:', productId);
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
  
    try {
      // Find the user
      const user = await User.findById(req.user.id);
    //  console.log('User:', user); 
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Filter out the item from the cart
      user.wishlist = user.wishlist.filter(item => {
        console.log('Comparing:', item.product.toString(), '!==', productId);
        return item.product.toString() !== productId.toString();
      });

     // console.log('Updated wishlist:', user.wishlist); Debugging log
  
      await user.save();
  
      res.status(200).json({ message: 'Product removed from cart', wishlist: user.wishlist });
    } catch (err) {
      console.error('Remove from Cart Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  
  