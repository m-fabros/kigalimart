const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// POST / - Create order
router.post('/', async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  try {
    const order = await Order.create({ orderItems, shippingAddress, totalPrice });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET / - Get all orders (admin)
router.get('/', protect, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized as admin' });
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /:id - Update order status (admin)
router.put('/:id', protect, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized as admin' });
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status || order.status;
    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /:id - Delete order (admin)
router.delete('/:id', protect, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Not authorized as admin' });
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.deleteOne();
    res.json({ message: 'Order removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;