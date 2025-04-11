// ShopItemVariation.js
// Defines variations of shop items based on attributes (e.g., M-Black, L-Red)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shopItemVariationSchema = new Schema(
  {
    shopItemId: {
      type: Schema.Types.ObjectId,
      ref: 'ShopItem',
      required: true,
    }, // Reference to the main ShopItem
    variations: [
      {
        attributeId: {
          type: Schema.Types.ObjectId,
          ref: 'ShopProductAttribute',
          required: true,
        }, // Reference to ShopProductAttribute
        value: {
          type: String,
          required: true,
        }, // Value for this attribute (e.g., 'M', 'Black')
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    }, // Price for this variation
    stock: {
      type: Number,
      required: true,
      min: 0,
    }, // Stock for this variation
    sku: {
      type: String,
      trim: true,
      unique: true,
    }, // Unique SKU for the variation
    image: {
      type: String,
      trim: true,
    }, // Optional image for this variation
  },
  {
    timestamps: true,
  }
);


shopItemVariationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'variations.attributeId',
    model: 'ShopItemAttribute',
    select: 'name',
  });
  next();
});



module.exports = model('ShopItemVariation', shopItemVariationSchema);
