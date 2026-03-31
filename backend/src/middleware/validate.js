const validate = (schema) => {
  if (!schema) {
    throw new Error('Schema is required for validation middleware');
  }
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ success: false, message });
    }
    if (typeof next === 'function') {
      next();
    } else {
      console.error('Next is not a function in validate middleware');
    }
  };
};

module.exports = validate;
