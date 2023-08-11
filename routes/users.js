const router = require('express').Router();
const { updateProfile, getCurrentUser } = require('../controllers/users');
const { userValidate } = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', userValidate, updateProfile);

module.exports = router;
