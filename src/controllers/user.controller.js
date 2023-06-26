const userService = require('../services/user.services');
const authService = require('../services/auth.services');

exports.signUp = authService.signUp;
exports.login = authService.login;

exports.getAllUser = userService.getAllUser;
exports.getUser = userService.getUser;
exports.createUser = userService.createUser;
exports.updateUser = userService.updateUser;
exports.deleteUser = userService.deleteUser;
