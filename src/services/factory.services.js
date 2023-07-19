const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = (Model) => {
  return catchAsync(async (req, res) => {
    const data = await Model.find();
    if (!data) return new AppError('No document found with that ID', 404);
    res.status(200).json({
      status: 'success',
      result: data.length,
      data,
    });
  });
};
exports.getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);
    if (!data) return next(new AppError('No document found with that ID', 404));
    res.status(200).json({
      status: 'success',
      data,
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    if (!data) return next(new AppError('No document found with that ID', 404));
    res.status(201).json({
      status: 'success',
      data,
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return next(new AppError('No document found with that ID', 404));
    res.status(200).json({
      status: 'success',
      data,
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return next(new AppError('No document found with that ID', 404));
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};
