const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  { name: 'Bluetooth Headphones', description: 'Wireless over-ear headphones with noise cancellation', price: 45000, image: 'https://picsum.photos/seed/h1/400/400', category: 'Electronics', brand: 'SoundMax', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'USB-C Charging Cable', description: 'Fast charging 2m USB-C cable', price: 6500, image: 'https://picsum.photos/seed/h2/400/400', category: 'Electronics', brand: 'TechLine', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Power Bank 20000mAh', description: 'Portable charger with dual USB ports', price: 35000, image: 'https://picsum.photos/seed/h3/400/400', category: 'Electronics', brand: 'ChargePro', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with long battery life', price: 18000, image: 'https://picsum.photos/seed/h4/400/400', category: 'Electronics', brand: 'TechLine', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Cotton T-Shirt', description: 'Comfortable everyday cotton t-shirt', price: 8000, image: 'https://picsum.photos/seed/f1/400/400', category: 'Fashion', brand: 'KigaliWear', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Denim Jeans', description: 'Classic fit denim jeans', price: 22000, image: 'https://picsum.photos/seed/f2/400/400', category: 'Fashion', brand: 'UrbanStyle', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Running Sneakers', description: 'Lightweight running shoes for all terrains', price: 38000, image: 'https://picsum.photos/seed/f3/400/400', category: 'Fashion', brand: 'SpeedRun', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'LED Desk Lamp', description: 'Adjustable LED lamp with USB charging port', price: 15000, image: 'https://picsum.photos/seed/home1/400/400', category: 'Home', brand: 'BrightHome', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Bedsheet Set', description: 'King size 100% cotton bedsheet set', price: 28000, image: 'https://picsum.photos/seed/home2/400/400', category: 'Home', brand: 'ComfortLiving', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Organic Flour 2kg', description: 'Premium quality organic wheat flour', price: 4500, image: 'https://picsum.photos/seed/g1/400/400', category: 'Grocery', brand: 'FarmFresh', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Cooking Oil 1L', description: 'Pure sunflower cooking oil', price: 3200, image: 'https://picsum.photos/seed/g2/400/400', category: 'Grocery', brand: 'GoldenCook', stock: 50, rating: 4.5, numReviews: 10 },
  { name: 'Facial Moisturizer', description: 'Daily hydrating facial cream for all skin types', price: 12000, image: 'https://picsum.photos/seed/b1/400/400', category: 'Beauty', brand: 'GlowUp', stock: 50, rating: 4.5, numReviews: 10 },
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