const express = require('express');
const router = express.Router();
const {
  getAllFoods,
  getFoodById,
  getCategories,
  getPopularFoods,
  getFeaturedFoods,
  getStats,
} = require('../controllers/foodController');

// ⚠️ Named routes MUST come before /:id — otherwise Express
//    treats "categories", "popular" etc. as ID values
router.get('/categories', getCategories);
router.get('/popular',    getPopularFoods);
router.get('/featured',   getFeaturedFoods);
router.get('/stats',      getStats);

router.get('/',     getAllFoods);
router.get('/:id',  getFoodById);

module.exports = router;
