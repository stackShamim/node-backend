const success = ({ res, message, data = {}, code = 200 }) => {
  return res.status(code).json({
    status: 'success',
    message,
    data,
  });
};

const error = ({ res, message, code = 500, details = null }) => {
  return res.status(code).json({
    status: 'error',
    message,
    error: details,
  });
};

module.exports = {
  success,
  error,
};
