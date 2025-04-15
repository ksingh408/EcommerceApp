const express = require('express');
const router = express.Router();
const { addToWishlist,getWishlist } = require('../controllers/wishlistController');
const { protect ,authorizeRoles} = require('../middlewares/authMiddleware');

router.use(protect);
router.use(authorizeRoles('user')); // Ensure only users can access this route
router.post('/', addToWishlist);
router.get('/', getWishlist); // Assuming you have a getWishlist function in your controller

module.exports = router;
