const router = require('express').Router();
const { authValidate, registerValidate } = require('../middlewares/validation');

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

// регистрация
router.post('/signup', registerValidate, createUser);

// авторизация
router.post('/signin', authValidate, login);

router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
