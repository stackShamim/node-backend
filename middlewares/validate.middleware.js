const { error } = require('../utils/response.util');

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // Validate + strip unknowns
    next();
  } catch (err) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return error({
      res,
      message: 'Validation failed.',
      code: 400,
      details: formattedErrors,
    });
  }
};

module.exports = validate;
