const express = require('express');
const foodController = require('../controllers/foodController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

/*********************
 **  User   Routes  **
 *********************/
router.use(authController.protect);

router
  .route('/')
  .get(foodController.getMyFoods)
  .post(foodController.createMyFood);

// router.route('/:id').get(foodController.getOneFood);

/*********************
 **  Admin  Routes  **
 *********************/
router.use(authController.restrictTo('admin'));

router
  .route('/admin')
  .get(foodController.getAllFoods)
  .post(foodController.createAFood);

router.route('/admin/stats').get(foodController.getFoodStats);

router
  .route('/admin/:id')
  .get(foodController.getAFood)
  .patch(foodController.updateAFood)
  .delete(foodController.deleteAFood);

module.exports = router;
