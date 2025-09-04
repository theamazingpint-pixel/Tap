const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, index: true, trim:true },
  passwordHash: { type: String, required: true },

  role: { type: String, enum: ['user','admin'], default: 'user', index: true },

  isSubscribed: { type: Boolean, default: false, index: true },
  subscriptionAt: { type: Date },
  subscriptionEnd: { type: Date },          
  subscriptionPlan: { type: String },      

  name: { type: String, trim: true },
  phone: { type: String, trim: true },
}, { timestamps: true });

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
