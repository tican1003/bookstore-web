const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Book = require('../models/book.model');

exports.getAllBook = catchAsync(async (req, res) => {
  const data = await Book.find();
  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});
exports.getBook = catchAsync(async (req, res, next) => {
  const data = await Book.findById(req.params.id);
  if (!data) return next(new AppError('No document found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.createBook = catchAsync(async (req, res) => {
  const data = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const data = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return next(new AppError('No document found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const data = await Book.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('No document found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
