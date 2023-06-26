const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
