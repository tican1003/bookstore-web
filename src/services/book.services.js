const Book = require('../models/book.model');
const Factory = require('./factory.services');

exports.getAllBook = Factory.getAll(Book);
exports.getBook = Factory.getOne(Book);
exports.createBook = Factory.createOne(Book);
exports.updateBook = Factory.updateOne(Book);
exports.deleteBook = Factory.deleteOne(Book);
