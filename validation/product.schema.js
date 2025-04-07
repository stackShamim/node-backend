const { z } = require('zod');

// Zod schema for creating a product
const productSchema = z.object({
  name: z
    .string({
      required_error: 'Product name is required.',
    })
    .trim()
    .min(1, 'Product name cannot be empty.'),

  description: z.string().trim().optional(),

  price: z
    .number({
      invalid_type_error: 'Price must be a number.',
    })
    .min(0, 'Price cannot be negative.')
    .optional(),

  images: z.array(z.string().trim()).optional(),

  vendorId: z.string().trim().optional(),
  isNewProduct: z.boolean().optional().default(true),

  hasFreeSample: z.boolean().optional().default(false),

  isCustomizable: z.boolean().optional().default(false),

  category: z.string().trim().optional(),

  stock: z.number().min(0, 'Stock cannot be negative.').optional().default(0),
});

// Partial schema for updates (all fields optional)
const updateProductSchema = productSchema.partial();

module.exports = {
  productSchema,
  updateProductSchema,
};
