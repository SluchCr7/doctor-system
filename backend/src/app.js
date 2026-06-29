require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { sanitizeMiddleware } = require('./middleware/sanitize');
const { rateLimit } = require('express-rate-limit');
const errorHandler = require('./middleware/error');

// Route files
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const financialRoutes = require('./routes/financialRoutes');
const medicalRoutes = require('./routes/medicalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Swagger Documentation
const { specs, swaggerUi } = require('./config/swagger');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security Middlewares
app.use(helmet()); // Sets various HTTP headers for security
app.use(sanitizeMiddleware); // Native NoSQL injection prevention

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
});
app.use('/api/auth/login', limiter);
app.use('/api/auth/register', limiter);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/medical', medicalRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the Medical Clinic API' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
