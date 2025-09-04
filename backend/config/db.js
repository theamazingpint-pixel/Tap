const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not set');
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected:', conn.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
