const Food = require('../models/foodModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');
const handlerFactory = require('./handlerFactory');

/********************
 ** User Functions **
 ********************/
exports.createMyFood = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  req.body = { ...req.body, createdBy: req.user.id };
  const food = await Food.create(req.body);

  res.status(201).json({
    status: 'success',
    data: food,
  });
});

exports.getMyFoods = catchAsync(async (req, res, next) => {
  // Users can only view their own foods.
  const filter = { createdBy: req.user.id };

  const features = new APIFeatures(Food.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const foods = await features.query;

  res.status(200).json({
    status: 'success',
    results: foods.length,
    data: foods,
  });
});

/*********************
 ** Admin Functions **
 *********************/
exports.getAllFoods = handlerFactory.getAll(Food);
exports.getAFood = handlerFactory.getOne(Food);
exports.createAFood = handlerFactory.createOne(Food);
exports.updateAFood = handlerFactory.updateOne(Food);
exports.deleteAFood = handlerFactory.deleteOne(Food);

// TODO: Clarify whether we should use `createdAt` or `consumedAt` for these statistics.
exports.getFoodStats = catchAsync(async (req, res, next) => {
  /*
   * Calculate stats for current week
   */
  console.log(1);
  const endDate = new Date(Date.now());
  endDate.setHours(24, 0, 0, 0); // The midnight tomorrow (dates strictly less than this occur on or before today).

  const startDate = new Date(endDate.getTime());
  startDate.setDate(startDate.getDate() - 7);

  console.log(startDate);
  console.log(endDate);
  const currentWeekFoodStats = await Food.aggregate([
    { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
    {
      $group: {
        _id: null,
        totalFoodsAdded: { $sum: 1 },
        totalCaloriesAdded: { $sum: '$calories' },
      },
    },
  ]);
  console.log(3);
  const currentWeekActiveUsers = await Food.aggregate([
    { $match: { createdAt: { $gte: startDate, $lt: endDate } } },

    { $group: { _id: '$createdBy' } },
    { $group: { _id: 1, count: { $sum: 1 } } },
  ]);
  console.log(4);
  /*
   * Calculate stats for previous week
   */
  endDate.setDate(endDate.getDate() - 7);
  startDate.setDate(startDate.getDate() - 7);
  console.log(5);
  const previousWeekFoodStats = await Food.aggregate([
    { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
    {
      $group: {
        _id: null,
        totalFoodsAdded: { $sum: 1 },
        totalCaloriesAdded: { $sum: '$calories' },
      },
    },
  ]);
  console.log(6);
  const previousWeekActiveUsers = await Food.aggregate([
    { $match: { createdAt: { $gte: startDate, $lt: endDate } } },

    { $group: { _id: '$createdBy' } },
    { $group: { _id: 1, count: { $sum: 1 } } },
  ]);
  console.log(7);

  res.status(200).json({
    status: 'success',
    data: {
      currentWeekFoodStats,
      currentWeekActiveUsers,
      previousWeekFoodStats,
      previousWeekActiveUsers,
    },
  });
});
