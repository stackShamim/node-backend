// ShopItemAttribute.js
// Defines product attributes specific to shop items (e.g., Size, Color for ShopItems)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shopItemAttributeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // Attribute name (e.g., Size, Color)
    values: [{ type: String, trim: true }], // List of possible values for the attribute (e.g., 'S', 'M', 'L' for Size)
  },
  { timestamps: true }
);

module.exports = model('ShopItemAttribute', shopItemAttributeSchema);
