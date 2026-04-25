const path = require('path');
const fs   = require('fs');

const DATA_DIR   = path.resolve(__dirname, '..', 'data');
const ordersPath = path.join(DATA_DIR, 'orders.json');

const readOrders  = () => {
  if (!fs.existsSync(ordersPath)) return [];
  try { return JSON.parse(fs.readFileSync(ordersPath, 'utf-8')); }
  catch { return []; }
};
const writeOrders = (data) =>
  fs.writeFileSync(ordersPath, JSON.stringify(data, null, 2), 'utf-8');

// POST /api/orders
exports.createOrder = (req, res) => {
  try {
    const { items, customer, address, paymentMethod, subtotal, tax, deliveryFee, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    const orders   = readOrders();
    const newOrder = {
      id:                Date.now(),
      orderId:           `FD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      items,
      customer:          customer  || { name: 'Guest', email: 'guest@foodie.com' },
      address:           address   || '—',
      paymentMethod:     paymentMethod || 'COD',
      subtotal:          subtotal  || 0,
      tax:               tax       || 0,
      deliveryFee:       deliveryFee || 0,
      total:             total     || 0,
      status:            'confirmed',
      estimatedDelivery: '30–45 min',
      createdAt:         new Date().toISOString(),
    };

    orders.push(newOrder);
    writeOrders(orders);

    return res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    console.error('[createOrder]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders/:orderId
exports.getOrderById = (req, res) => {
  try {
    const orders = readOrders();
    const order  = orders.find((o) => o.orderId === req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.json({ success: true, data: order });
  } catch (err) {
    console.error('[getOrderById]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};
