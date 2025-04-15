const express = require('express');
const router = express.Router();
const { addToWishlist } = require('../controllers/wishlistController');
const { protect ,authorizeRoles} = require('../middlewares/authMiddleware');

router.use(protect);
router.use(authorizeRoles('user')); // Ensure only users can access this route
router.post('/', addToWishlist);

module.exports = router;
