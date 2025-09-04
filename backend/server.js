require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');

connectDB();

const app = express();

// --- CORS FIRST ---
const allowed = [
  process.env.CLIENT_URL,          
  'http://localhost:5173',
  'http://192.168.1.17/:5173',
].filter(Boolean);

app.use(cors({
  origin: allowed,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// --- other middleware ---
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// --- routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));  
app.use('/api/admin', adminRoutes);

app.get('/', (_req, res) => res.send('E-Magazine API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
