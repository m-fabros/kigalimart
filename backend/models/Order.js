const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [
    {
      name: String,
      qty: Number,
      image: String,
      price: Number,
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    }
  ],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    phone: String,
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);