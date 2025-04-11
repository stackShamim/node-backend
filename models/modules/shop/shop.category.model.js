// ShopCategory.js
// Category for shop items (e.g., Electronics, Fashion)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shopCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // Category name
    status: {
      type: Boolean,
      default: true,
    }, // Active/inactive toggle
    featured: {
      type: Boolean,
      default: false,
    }, // Mark as featured in frontend
    priority: {
      type: Number,
      default: 0,
      min: 0,
    }, // Sorting priority
  },
  { timestamps: true }
);

module.exports = model('ShopCategory', shopCategorySchema);
