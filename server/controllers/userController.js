// controllers/authController.js
const User = require('../models/userModel');
const express = require('express');
const generateToken = require('../utils/userTokens');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  
  
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt); 


  const user = await User.create({ name, email, password, role });
 

  res.status(201).json({ user});
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id, user.role);

    // Set token in cookie
    res.cookie('token', token, {
        httpOnly: true,       // prevents JavaScript access
        secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: 'strict',   // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
  res.json({ user});
};
