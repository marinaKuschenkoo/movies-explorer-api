const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Errors
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AlreadyExistError = require('../errors/AlreadyExistError');
const {
  SUCCESS_MESSAGE,
  USER_EXIST_MESSAGE,
  INVALID_DATA,
  USER_NOT_FOUND,
} = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET', {
        expiresIn: '7d',
      });
      res.send({ message: SUCCESS_MESSAGE, token });
    })
    .catch(next);
};

// Регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new AlreadyExistError(USER_EXIST_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA));
      } else {
        next(err);
      }
    });
};

// users/me-Получение информации текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA));
      } else if (err.code === 11000) {
        next(new AlreadyExistError(USER_EXIST_MESSAGE));
      } else {
        next(err);
      }
    });
};
