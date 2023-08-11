const SECRET = 'JWT_SECRET';
const DATABASE = 'mongodb://127.0.0.1:27017/bitfilmsdb';

// код ошибок
const ALREADY_EXIST_ERROR = 409;
const BAD_REQUEST_ERROR = 400;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const UNAUTHORIZED = 401;

// Ошибки с фильмами
const INVALID_MOVIE_DATA = 'Переданы некорректные данные при создании фильма.';
const NOT_FOUND_MOVIE_MESSAGE = 'Фильм с данным _id не найден';
const ACCESS_MESSAGE = 'Невозможно удалить фильм с другим _id пользователя';
const INVALID_DATA = 'Переданы некорректные данные';

// Ошибки при авторизации/регистрации
const SUCCESS_MESSAGE = 'Авторизация прошла успешно';
const UNAUTHORIZED_MESSAGE = 'Необходима авторизация!';
const INVALID_AUTHORIZATION_DATA = 'Неправильные почта или пароль';
const PAGE_NOT_FOUND_MESSAGE = 'Страницы не существует';
const USER_EXIST_MESSAGE = 'Пользователь с данным email уже существует';
const USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';

// другие ошибки
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';
const MAX_LIMIT_RATE_ERROR = 'Превышено ограничение количества запросов, попробуйте снова позже.';

module.exports = {
  DATABASE,
  SECRET,
  ALREADY_EXIST_ERROR,
  BAD_REQUEST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED,
  INVALID_MOVIE_DATA,
  NOT_FOUND_MOVIE_MESSAGE,
  ACCESS_MESSAGE,
  INVALID_DATA,
  SUCCESS_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  INVALID_AUTHORIZATION_DATA,
  PAGE_NOT_FOUND_MESSAGE,
  USER_EXIST_MESSAGE,
  USER_NOT_FOUND,
  SERVER_ERROR_MESSAGE,
  MAX_LIMIT_RATE_ERROR,
};
