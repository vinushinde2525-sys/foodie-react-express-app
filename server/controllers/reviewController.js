const path = require('path');
const fs   = require('fs');

const DATA_DIR    = path.resolve(__dirname, '..', 'data');
const reviewsPath = path.join(DATA_DIR, 'reviews.json');

const readReviews = () => {
  if (!fs.existsSync(reviewsPath)) return [];
  try { return JSON.parse(fs.readFileSync(reviewsPath, 'utf-8')); }
  catch { return []; }
};

// GET /api/reviews  — ?foodId= to filter
exports.getReviews = (req, res) => {
  try {
    let reviews = readReviews();
    if (req.query.foodId) {
      const fid = parseInt(req.query.foodId, 10);
      reviews = reviews.filter((r) => r.foodId === fid);
    }
    return res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    console.error('[getReviews]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};
