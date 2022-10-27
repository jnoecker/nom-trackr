const Food = require('../models/foodModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');

/********************
 ** User Functions **
 ********************/
exports.createMyFood = () => {
  catchAsync(async (req, res, next) => {
    req.body.createdBy = req.user.id;
    const food = await Food.create(req.body);

    res.status(201).json({
      status: 'success',
      data: food,
    });
  });
};

exports.getMyFoods = () => {
  catchAsync(async (req, res, next) => {
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
};

/*********************
 ** Admin Functions **
 *********************/
