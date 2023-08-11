const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');
const { SECRET, UNAUTHORIZED_MESSAGE } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized(UNAUTHORIZED_MESSAGE));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET);
  } catch (error) {
    next(new Unauthorized(UNAUTHORIZED_MESSAGE));
    return;
  }
  req.user = payload;
  next();
};
