const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ success: false, msg: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: 'Token is not valid' });
  }
}

module.exports = { authenticate };
