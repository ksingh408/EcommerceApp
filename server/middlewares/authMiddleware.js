const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')|| !token) {
    console.error('Authorization header or token not found');
    console.error('Authorization header:', authHeader);
    console.error('Token:', token);
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {

    console.log(req.user);

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    next();
  };
};