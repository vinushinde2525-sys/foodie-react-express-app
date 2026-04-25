const path = require('path');
const fs   = require('fs');

const DATA_DIR  = path.resolve(__dirname, '..', 'data');
const foodsPath = path.join(DATA_DIR, 'foods.json');

const readData = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Data file not found: ' + filePath);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    throw new Error('JSON parse error at ' + filePath + ': ' + e.message);
  }
};

// GET /api/foods
exports.getAllFoods = (req, res) => {
  try {
    let foods = readData(foodsPath);
    const { category, search, sort, limit, isVeg } = req.query;

    if (category && category !== 'all') {
      foods = foods.filter(function(f) { return f.category === category; });
    }
    if (search) {
      var q = search.toLowerCase();
      foods = foods.filter(function(f) {
        return (
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          (f.tags && f.tags.some(function(t) { return t.toLowerCase().includes(q); }))
        );
      });
    }
    if (isVeg === 'true') {
      foods = foods.filter(function(f) { return f.isVeg === true; });
    }
    if (sort === 'price_asc')        foods.sort(function(a,b){ return a.price - b.price; });
    else if (sort === 'price_desc')  foods.sort(function(a,b){ return b.price - a.price; });
    else if (sort === 'rating')      foods.sort(function(a,b){ return b.rating - a.rating; });
    else if (sort === 'popular')     foods.sort(function(a,b){ return b.reviewCount - a.reviewCount; });
    if (limit) foods = foods.slice(0, parseInt(limit, 10));

    return res.json({ success: true, count: foods.length, data: foods });
  } catch (err) {
    console.error('[getAllFoods]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/foods/categories
exports.getCategories = (req, res) => {
  try {
    var foods = readData(foodsPath);
    var icons = {
      burger:   'burger',
      pizza:    'pizza',
      chicken:  'chicken',
      sides:    'sides',
      drinks:   'drinks',
      sandwich: 'sandwich',
      indian:   'indian',
      desserts: 'desserts'
    };
    var counts = {};
    foods.forEach(function(f) {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    var categories = Object.entries(counts).map(function(entry) {
      var name  = entry[0];
      var count = entry[1];
      return {
        id:    name,
        name:  name.charAt(0).toUpperCase() + name.slice(1),
        icon:  icons[name] || 'food',
        count: count
      };
    });
    return res.json({ success: true, data: categories });
  } catch (err) {
    console.error('[getCategories]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/foods/popular
exports.getPopularFoods = (req, res) => {
  try {
    var foods = readData(foodsPath);
    var popular = foods
      .filter(function(f) { return f.isPopular === true; })
      .sort(function(a,b) { return b.reviewCount - a.reviewCount; })
      .slice(0, 6);
    return res.json({ success: true, data: popular });
  } catch (err) {
    console.error('[getPopularFoods]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/foods/featured
exports.getFeaturedFoods = (req, res) => {
  try {
    var foods    = readData(foodsPath);
    var featured = foods.filter(function(f) { return f.isFeatured === true; }).slice(0, 6);
    return res.json({ success: true, data: featured });
  } catch (err) {
    console.error('[getFeaturedFoods]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/foods/:id
exports.getFoodById = (req, res) => {
  try {
    var foods = readData(foodsPath);
    var id    = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id: ' + req.params.id });
    }
    var food = foods.find(function(f) { return f.id === id; });
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food with id ' + id + ' not found' });
    }
    return res.json({ success: true, data: food });
  } catch (err) {
    console.error('[getFoodById]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/foods/stats
exports.getStats = (req, res) => {
  try {
    var foods      = readData(foodsPath);
    var catMap     = {};
    foods.forEach(function(f) {
      if (!catMap[f.category]) {
        catMap[f.category] = { category: f.category, count: 0, revenue: 0 };
      }
      catMap[f.category].count   += 1;
      catMap[f.category].revenue += f.price * (Math.floor(Math.random() * 50) + 10);
    });
    var weeklyOrders = [
      { day: 'Mon', orders: 42  },
      { day: 'Tue', orders: 78  },
      { day: 'Wed', orders: 55  },
      { day: 'Thu', orders: 91  },
      { day: 'Fri', orders: 134 },
      { day: 'Sat', orders: 189 },
      { day: 'Sun', orders: 156 }
    ];
    var uniqueCats = [];
    foods.forEach(function(f) {
      if (!uniqueCats.includes(f.category)) uniqueCats.push(f.category);
    });
    var totalRating = foods.reduce(function(s, f) { return s + f.rating; }, 0);
    return res.json({
      success: true,
      data: {
        totalFoods:      foods.length,
        totalCategories: uniqueCats.length,
        avgRating:       (totalRating / foods.length).toFixed(2),
        categoryStats:   Object.values(catMap),
        weeklyOrders:    weeklyOrders
      }
    });
  } catch (err) {
    console.error('[getStats]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};
