const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isNewProduct: {
      type: Boolean,
      default: true,
    },
    hasFreeSample: {
      type: Boolean,
      default: false,
    },
    isCustomizable: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);
