/**
 * Recursively sanitizes an object to prevent MongoDB operator injection.
 * Removes any keys that start with '$' or contain '.'.
 */
function sanitizeInput(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeInput(item));
  }

  const sanitized = {};
  for (const key in obj) {
    // Skip restricted MongoDB operator keys
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    sanitized[key] =
      typeof obj[key] === 'object' && obj[key] !== null
        ? sanitizeInput(obj[key])
        : obj[key];
  }
  return sanitized;
}

/**
 * Global middleware for input sanitization.
 */
function sanitizeMiddleware(req, res, next) {
  if (req.body) req.body = sanitizeInput(req.body);
  if (req.query) req.query = sanitizeInput(req.query);
  if (req.params) req.params = sanitizeInput(req.params);

  if (typeof next === 'function') {
    next();
  } else {
    console.error('Next is not a function in sanitize middleware');
  }
}

module.exports = {
  sanitizeInput,
  sanitizeMiddleware
};
