const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const {
  INVALID_MOVIE_DATA,
  NOT_FOUND_MOVIE_MESSAGE,
  ACCESS_MESSAGE,
  INVALID_DATA,
} = require('../utils/constants');
// const {} = require('../utils/constants');

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch((err) => next(err));
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
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
  } = req.body;
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
    .then((movie) => { res.send({ movie }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_MOVIE_DATA));
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
        throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
      } else if (movie && !(movie.owner.toString() === req.user._id)) {
        throw new ForbiddenError(ACCESS_MESSAGE);
      }

      Movie.deleteOne(movie)
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(INVALID_DATA));
      } else {
        next(error);
      }
    });
};
