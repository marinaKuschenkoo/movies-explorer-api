const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const InterdictionError = require('../errors/InterdictionError');
const BadRequestError = require('../errors/BadRequestError');

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req,res,next) => {
  Movie.find({})
    .then(movies => res.send({movies}))
    .catch((err) => next(err));
}

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Некорректные поля при создании фильма');
      }
      res.send({movie});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с данным _id не найдена');
      } else if (movie && !(movie.owner.toString() === req.user._id)) {
        throw new InterdictionError('Невозможно удалить фильм с другим _id пользователя');
      }

      Movie.deleteOne(movie)
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
      } else {
        next(error);
      }
    });
};