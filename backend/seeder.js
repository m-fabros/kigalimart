const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // Electronics
  {
    name: 'Bluetooth Headphones',
    description: 'Wireless over-ear headphones with noise cancellation',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics', brand: 'SoundMax', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'USB-C Charging Cable',
    description: 'Fast charging 2m USB-C cable',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400',
    category: 'Electronics', brand: 'TechLine', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'Power Bank 20000mAh',
    description: 'Portable charger with dual USB ports',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
    category: 'Electronics', brand: 'ChargePro', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    category: 'Electronics', brand: 'TechLine', stock: 50, rating: 4.5, numReviews: 10
  },
  // Fashion
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable everyday cotton t-shirt',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Fashion', brand: 'KigaliWear', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'Denim Jeans',
    description: 'Classic fit denim jeans',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    category: 'Fashion', brand: 'UrbanStyle', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'Running Sneakers',
    description: 'Lightweight running shoes for all terrains',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Fashion', brand: 'SpeedRun', stock: 50, rating: 4.5, numReviews: 10
  },
  // Home
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED lamp with USB charging port',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    category: 'Home', brand: 'BrightHome', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'Bedsheet Set',
    description: 'King size 100% cotton bedsheet set',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    category: 'Home', brand: 'ComfortLiving', stock: 50, rating: 4.5, numReviews: 10
  },
  // Grocery
  {
    name: 'Organic Flour 2kg',
    description: 'Premium quality organic wheat flour',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    category: 'Grocery', brand: 'FarmFresh', stock: 50, rating: 4.5, numReviews: 10
  },
  {
    name: 'Cooking Oil 1L',
    description: 'Pure sunflower cooking oil',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    category: 'Grocery', brand: 'GoldenCook', stock: 50, rating: 4.5, numReviews: 10
  },
  // Beauty
  {
    name: 'Facial Moisturizer',
    description: 'Daily hydrating facial cream for all skin types',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    category: 'Beauty', brand: 'GlowUp', stock: 50, rating: 4.5, numReviews: 10
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ 12 Products Inserted Successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();