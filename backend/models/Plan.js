const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  razorpayPlanId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true }, // in paise
  currency: { type: String, default: 'INR' },
  period: { type: String, required: true }, // e.g. month, year
  interval: { type: Number, required: true }, // e.g. 1
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
