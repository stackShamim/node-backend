const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shopItemSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    categoryId: { type: Schema.Types.ObjectId, ref: 'ShopCategory' },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'ShopSubcategory' },

    images: [{ type: String, trim: true }],
    isNewProduct: { type: Boolean, default: true },
    hasFreeSample: { type: Boolean, default: false },
    isCustomizable: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: get all item variations linked to this shopItem
shopItemSchema.virtual('variations', {
  ref: 'ShopItemVariation',
  localField: '_id',
  foreignField: 'shopItemId',
});



module.exports = model('ShopItem', shopItemSchema);
