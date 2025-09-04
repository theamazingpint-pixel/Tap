const User = require('../models/User');
const Payment = require('../models/Payment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Razorpay = require('razorpay');
const { welcomeEmail  } = require('../utils/emailTemplates');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const SUBSCRIPTION_AMOUNT = 19900; // 199.00 INR in paise

exports.signup = async (req, res) => {
  try {
    const rawEmail = (req.body?.email ?? '');
    const password = req.body?.password ?? '';

    const email = rawEmail.trim().toLowerCase();
    if (!email) return res.status(400).json({ msg: 'Email required' });
    if (!password) return res.status(400).json({ msg: 'Password required' });

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    const { subject, html, text } = welcomeEmail({ email: user.email, password });
    sendEmail({ to: user.email, subject, html, text })
      .catch(e => console.error('sendEmail error:', e?.message || e));

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    if (err?.code === 11000 && err?.keyPattern?.email) {
      return res.status(400).json({ msg: 'Email already registered' });
    }
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ msg: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    sendEmail({ to: user.email, subject: 'Logged in', text: 'You have logged in successfully' })
      .catch((e) => console.error('sendEmail error:', e?.message || e));

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, email: user.email, isSubscribed: user.isSubscribed, role: user.role }, token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user); 
};