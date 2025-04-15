// const jwt = require('jsonwebtoken');

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.token;
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  const token = cookieToken || headerToken;

  if (!token) {
    console.error('No token found in cookies or authorization header');
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded Token:', decoded);
    console.log('Cookies:', req.cookies);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
  };
};






// require('dotenv').config();
// exports.protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   const token = req.cookies?.token || (authHeader && authHeader.split(' ')[1]);
// if (!authHeader || !authHeader.startsWith('Bearer ') || !token) {
//   console.error('Authorization header or token not found');

//   return res.status(401).json({ message: 'Not authorized, no token provided' });
// }

//   try {
//     // const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Authorization header:', req.headers.authorization);
//     console.log('Cookies:', req.cookies);
//     // Attach user information to the request object
//     req.user = { id: decoded.id, role: decoded.role };
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', err.message);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {

//     console.log(req.user);

//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied, insufficient permissions' });
//     }
//     next();
//   };
// };