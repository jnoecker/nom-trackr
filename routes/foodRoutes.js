const express = require('express');
const foodController = require('../controllers/foodController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/').get(foodController.getMyFoods);

module.exports = router;
