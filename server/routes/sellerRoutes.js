const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser'); 
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
} = require('../controllers/sellerController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Protect all routes and restrict to sellers only
router.use(protect);
router.use(authorizeRoles('seller', 'admin')); // Allow only sellers and admins
// app.use(cookieParser());
// Seller-specific routes
router.get('/products', getSellerProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;