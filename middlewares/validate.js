const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // Validate + strip unknowns
    next();
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed.',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }
};

module.exports = validate;
