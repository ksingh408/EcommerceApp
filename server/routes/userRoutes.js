// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/user', protect, authorizeRoles('user'), (req, res) => {
  res.send('Welcome User!');
});

router.get('/seller', protect, authorizeRoles('seller'), (req, res) => {
  res.send('Welcome Seller!');
});

router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Welcome Admin!');
});

module.exports = router;
