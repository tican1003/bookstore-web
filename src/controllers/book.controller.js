const bookService = require('../services/book.services');

exports.getAllBook = bookService.getAllBook;
exports.getBook = bookService.getBook;

exports.createBook = bookService.createBook;
exports.updateBook = bookService.updateBook;
exports.deleteBook = bookService.deleteBook;
