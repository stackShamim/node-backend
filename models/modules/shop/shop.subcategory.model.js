// ShopSubcategory.js
// Subcategory for shop items (e.g., Mobile Phones under Electronics)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shopSubcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }, // Subcategory name
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ShopCategory', // Reference to ShopCategory
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    }, // Active/inactive
    featured: {
      type: Boolean,
      default: false,
    }, // Featured in UI
    priority: {
      type: Number,
      default: 0,
      min: 0,
    }, // Display order
  },
  {
    timestamps: true,
  }
);

module.exports = model('ShopSubcategory', shopSubcategorySchema);
