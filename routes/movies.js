const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidate, movieIdValidate } = require('../middlewares/validation');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм
router.post('/movies', movieValidate, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:_id', movieIdValidate, deleteMovie);

module.exports = router;
