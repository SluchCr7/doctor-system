const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mock auth and validate middleware to keep tests focused
jest.mock('../src/middleware/auth', () => ({
  protect: (req, res, next) => next(),
  authorize: (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    next();
  }
}));
jest.mock('../src/middleware/validate', () => (schema) => (req, res, next) => next());

// Create a small express app wired to the patient route handler
const patientController = require('../src/controllers/patientController');
const patientRoutes = require('../src/routes/patientRoutes');

jest.mock('../src/models/User');
jest.mock('../src/models/Appointment');

const User = require('../src/models/User');
const Appointment = require('../src/models/Appointment');

function setupApp(mockUser) {
  const app = express();
  app.use(bodyParser.json());

  // simple protect middleware stub
  app.use((req, res, next) => {
    req.user = mockUser;
    next();
  });

  app.use('/api/patient', patientRoutes);
  return app;
}

describe('PUT /api/patient/:id', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('doctor cannot update patient without appointment', async () => {
    const doctor = { id: 'doc1', role: 'doctor' };
    const app = setupApp(doctor);

    Appointment.exists.mockResolvedValue(false);

    const res = await request(app)
      .put('/api/patient/pt1')
      .send({ name: 'New Name' });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  test('doctor updates patient when appointment exists', async () => {
    const doctor = { id: 'doc1', role: 'doctor' };
    const app = setupApp(doctor);

    Appointment.exists.mockResolvedValue(true);

    const updatedUser = { _id: 'pt1', name: 'Updated', profileData: { phone: '123' } };
    User.findOneAndUpdate.mockResolvedValue({
      ...updatedUser,
      toObject: () => updatedUser
    });

    const res = await request(app)
      .put('/api/patient/pt1')
      .send({ name: 'Updated' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Updated');
  });

  test('admin updates patient without appointment', async () => {
    const admin = { id: 'adm1', role: 'admin' };
    const app = setupApp(admin);

    const updatedUser = { _id: 'pt1', name: 'Updated by admin' };
    User.findOneAndUpdate.mockResolvedValue({
      ...updatedUser,
      toObject: () => updatedUser
    });

    const res = await request(app)
      .put('/api/patient/pt1')
      .send({ name: 'Updated by admin' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Updated by admin');
  });
});
