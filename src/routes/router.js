const express = require('express');
const bookRoute = require('./book.route');
const userRoute = require('./user.route');

const router = express();

// ROUTES
router.use('/books', bookRoute);
router.use('/users', userRoute);

module.exports = router;
