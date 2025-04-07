const { z } = require('zod');

const USER_ROLES = ['customer', 'seller', 'distributor'];

const signUpSchema = z.object({
  fullName: z
    .string({
      required_error: 'Full name is required.',
    })
    .trim()
    .min(1, 'Full name cannot be empty.'),

  email: z
    .string({
      required_error: 'Email is required.',
    })
    .trim()
    .toLowerCase()
    .email('Invalid email format.'),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(6, 'Password must be at least 6 characters long.'),

  role: z.enum(USER_ROLES).optional(),

  businessName: z.string().trim().optional(),

  businessAddress: z.string().trim().optional(),
});

const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .trim()
    .toLowerCase()
    .email('Invalid email format.'),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(6, 'Password must be at least 6 characters.'),
});

module.exports = {
  signUpSchema,
  signInSchema,
};
