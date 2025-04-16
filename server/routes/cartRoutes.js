const express = require('express');
const router = express.Router();
const { addToCart,getCart,removeFromCart } = require('../controllers/cartController');
const { protect ,authorizeRoles} = require('../middlewares/authMiddleware');

router.use(protect);
router.use(authorizeRoles('user')); 

router.get('/', getCart); 
router.post('/', addToCart);
router.delete('/remove/:productId', removeFromCart); // Assuming you have a removeFromCart function in your controller

module.exports = router;
