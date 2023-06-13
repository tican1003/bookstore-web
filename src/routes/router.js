const express = require('express');
const bookRoute = require('./book.route');

const router = express();

// ROUTES
router.use('/books', bookRoute);

module.exports = router;
