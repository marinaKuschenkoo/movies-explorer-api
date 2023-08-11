const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const Unauthorized = require('../errors/Unauthorized');
const { INVALID_AUTHORIZATION_DATA } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректый адрес электронной почты',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(INVALID_AUTHORIZATION_DATA));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(INVALID_AUTHORIZATION_DATA));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
