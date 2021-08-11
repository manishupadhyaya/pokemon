const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys')

module.exports = isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);

    console.log("decodedTokens ", decodedToken)
    req.user = decodedToken.id;
    console.log("User", req.user)
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid user! Login again')
    });
  }
};