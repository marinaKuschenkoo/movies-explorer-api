require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');

const routes = require('./routes');

const ServerErrorHandler = require('./middlewares/ServerErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логгер
const cors = require('./middlewares/cors');

const app = express();
const { PORT = 3000, NODE_ENV, DB } = process.env;

app.use(cors);
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://127.0.0.1:27017/moviedb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());
app.use(routes); // подключаем роуты

// ошибки
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(ServerErrorHandler);

// запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});
