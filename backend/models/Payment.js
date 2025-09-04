const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    // what kind of flow created this record
    mode: { type: String, enum: ['order', 'subscription'], required: true, default: 'subscription' },

    // plan or price reference (optional, useful for audits)
    planId: { type: String },

    // Razorpay identifiers (unique when present)
    razorpayOrderId:        { type: String, index: { unique: true, sparse: true } },
    razorpaySubscriptionId: { type: String, index: { unique: true, sparse: true } },
    razorpayPaymentId:      { type: String, index: { unique: true, sparse: true } },

    amount: Number, // paise
    currency: { type: String, default: 'INR' },

    // allow states used by both orders and subscriptions
    status: {
      type: String,
      enum: ['created','authorized','captured','active','pending','failed','refunded','cancelled'],
      default: 'created',
    },

    notes: { type: Object, default: {} },
  },
  { timestamps: true }
);

// helpful listing/index
PaymentSchema.index({ user: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Payment', PaymentSchema);
