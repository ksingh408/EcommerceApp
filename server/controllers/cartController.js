const User = require('../models/userModel');
const Product = require('../models/productModel');


exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  

  // Validate productId and quantity
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid product or quantity' });
  }

  try {

    // Fetch the user from the database using the user ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the product being added to the cart
    const existingItem = user.cart.find(item => item.product.toString() === productId);
    console.log("exist item :",existingItem); // Debugging

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += 1;

    } else {
      
      // If it's a new product, add it to the cart
      user.cart.push({ product: productId, quantity });
    }

    // Save the user document with the updated cart
    await user.save();

    // Respond with the updated cart
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (err) {
    // General error handling
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  try {
    // ✅ Fetch the user and populate the cart with product details
    const user = await User.findById(req.user.id).populate('cart.product');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Respond with the populated cart
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error('Get Cart Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

 
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  
   console.log('Product ID to remove:', productId);
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Find the user
    const user = await User.findById(req.user.id);
    console.log('User:', user); // Debugging log  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter out the item from the cart
    user.cart = user.cart.filter(item => {
      console.log('Comparing:', item.product.toString(), '!==', productId);
      return item.product.toString() !== productId.toString();
    });
console.log('Updated Cart:', user.cart); // Debugging log

    await user.save();

    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (err) {
    console.error('Remove from Cart Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



