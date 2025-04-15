// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect ,authorizeRoles} = require('../middlewares/authMiddleware');
// const { authorizeAdmin } = require('../middlewares/authMiddleware');
const {
  getAllUsers,
  getAllProducts,
  deleteUser,
  deleteProduct,
} = require('../controllers/adminController');

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.get('/products', getAllProducts);
router.delete('/user/:id', deleteUser);
router.delete('/product/:id', deleteProduct);

module.exports = router;
