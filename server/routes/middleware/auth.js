const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware to authenticate jwt token
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // If token is not found
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Token not found, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
