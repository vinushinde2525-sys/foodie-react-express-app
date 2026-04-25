'use strict';
 
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const path    = require('path');
const fs      = require('fs');
 
// ── Startup check: verify data files exist before booting ─────────────────────
var dataDir = path.resolve(__dirname, 'data');
['foods.json', 'reviews.json', 'orders.json'].forEach(function(file) {
  var p = path.join(dataDir, file);
  if (!fs.existsSync(p)) {
    console.error('[STARTUP] Missing data file:', p);
    process.exit(1);
  }
  try {
    JSON.parse(fs.readFileSync(p, 'utf-8'));
    console.log('[STARTUP] OK:', file);
  } catch(e) {
    console.error('[STARTUP] Invalid JSON in', file, '-', e.message);
    process.exit(1);
  }
});
 
var foodRoutes   = require('./routes/foodRoutes');
var orderRoutes  = require('./routes/orderRoutes');
var reviewRoutes = require('./routes/reviewRoutes');
 
var app  = express();
var PORT = process.env.PORT || 3001;
 
// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    // Allow any localhost origin (5173, 5174, 3000, etc.)
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
 
// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/foods',   foodRoutes);
app.use('/api/orders',  orderRoutes);
app.use('/api/reviews', reviewRoutes);
 
// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', function(req, res) {
  res.json({ success: true, message: 'Foodie API running', timestamp: new Date().toISOString() });
});
 
// ── 404 handler ───────────────────────────────────────────────────────────────
app.use(function(req, res) {
  res.status(404).json({ success: false, message: 'Route ' + req.originalUrl + ' not found' });
});
 
// ── Global error handler ──────────────────────────────────────────────────────
app.use(function(err, req, res, next) {
  console.error('[ERROR]', err.stack || err.message);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});
 
// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, function() {
  console.log('');
  console.log('  Foodie API Server');
  console.log('  http://localhost:' + PORT);
  console.log('  Health: http://localhost:' + PORT + '/api/health');
  console.log('  Foods:  http://localhost:' + PORT + '/api/foods');
  console.log('');
});
 
module.exports = app;