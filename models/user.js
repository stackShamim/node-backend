const { Schema, model } = require('mongoose');
const { hashPassword } = require('../utils/auth');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'distributor'],
    default: 'user',
  },
  businessName: { type: String },
  businessAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await hashPassword(this.password);
});

module.exports = model('User', userSchema);
