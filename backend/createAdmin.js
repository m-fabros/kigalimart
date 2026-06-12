const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const existingAdmin = await User.findOne({ email: 'admin@kigalimart.rw' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit();
    }

    await User.create({
      name: 'KigaliMart Admin',
      email: 'admin@kigalimart.rw',
      password: 'Admin2026!',
      isAdmin: true,
    });

    console.log('✅ Admin user created!');
    console.log('Email: admin@kigalimart.rw');
    console.log('Password: Admin2026!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();