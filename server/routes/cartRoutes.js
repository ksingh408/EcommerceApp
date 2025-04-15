const express = require('express');
const router = express.Router();
const { addToCart,getCart } = require('../controllers/cartController');
const { protect ,authorizeRoles} = require('../middlewares/authMiddleware');

router.use(protect);
router.use(authorizeRoles('user')); 

router.get('/', getCart); 
router.post('/', addToCart);

module.exports = router;
