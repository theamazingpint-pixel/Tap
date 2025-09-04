const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = process.env.ADMIN_EMAIL;
    const pass = process.env.ADMIN_PASSWORD;

    if (!email || !pass) {
      throw new Error('⚠️ Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file');
    }

    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await bcrypt.hash(pass, 10);
      user = await User.create({
        email,
        passwordHash,
        role: 'admin',
        name: 'Administrator',
      });
      console.log('Admin created:', email);
    } else {
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log('ℹ️ Existing user promoted to admin:', email);
      } else {
        console.log('ℹ️ Admin already exists:', email);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
})();
