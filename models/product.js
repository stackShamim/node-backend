const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrls: {
    // array of strings
    type: String,
    required: true,
  },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isNewProduct: { type: Boolean, default: true },
  hasFreeSample: { type: Boolean, default: false },
  isCustomizable: { type: Boolean, default: false },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Product', productSchema);
