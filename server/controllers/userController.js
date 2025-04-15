// controllers/authController.js
const User = require('../models/userModel');
const express = require('express');
const generateToken = require('../utils/userTokens');
const bcrypt = require('bcrypt');




exports.register = async (req, res) => {
  const { name, email, password,role} = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role:role ||'user' });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ message: 'User not found' });
console.log(password);
    //Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    

    // if (!user || !(await bcrypt.compare(password, user.password)))
    //   return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.cookie('token', token, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({
      message: 'Login successful',
      user
    });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.logout = (req, res) => {

  try {
          res.clearCookie('token');
          res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
          console.error('Logout error:', error);
          res.status(500).json({ message: 'Server error during logout' });
        }
};



// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) return res.status(400).json({ message: 'User already exists' });
  
  
//     const hashPassword = await bcrypt.hash(password, 10); 


//   const user = await User.create({ name, email, password:hashPassword, role });
 

//   res.status(201).json({ user});
// };

// exports.login = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       const user = await User.findOne({ email });
//       console.log(user);
//       console.log(password);
//       const isvalidpasswords= await bcrypt.compare(password,user.password)
//       console.log(isvalidpasswords);
//       if (!user || !isvalidpasswords) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
  
//       const token = generateToken(user._id, user.role);
  
//       res.cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       });
  
//       res.status(200).json({
//         message: 'Login successful',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error during login' });
//     }
//   };
  
//   // Logout Controller - Clears JWT cookie
//   exports.logout = async (req, res) => {
//     try {
//       res.clearCookie('token', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//       });
//       res.status(200).json({ message: 'Logout successful' });
//     } catch (error) {
//       console.error('Logout error:', error);
//       res.status(500).json({ message: 'Server error during logout' });
//     }
//   };
  