const express = require('express');
const userController = require('../controllers/user.controller');
const authServices = require('../services/auth.services');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.use(authServices.protect);
router.post('/logout', userController.logout);

router.use(authServices.restrictTo('admin'));
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
