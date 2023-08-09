require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

//подключение роутов
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const auth = require('./middlewares/auth'); //мидлвэр авторизация
const { login, createUser } = require('./controllers/users'); //подключение контроллеров

//подключение ошибок
const NotFoundError = require('./errors/NotFoundError');
const ServerErrorHandler = require('./middlewares/ServerErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger'); //логгер

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/moviedb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов
//регистрация
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

//авторизация
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

//настройка роутов с авторизацией
app.use('/', auth, userRouter);
app.use('/', auth, movieRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
  return;
});

//ошибки
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(ServerErrorHandler);

//запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});