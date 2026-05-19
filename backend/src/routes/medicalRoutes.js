const express = require('express');
const router = express.Router();
const { getMedicalRecords, createMedicalRecord, getMedicalRecord } = require('../controllers/medicalController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getMedicalRecords)
  .post(authorize('doctor', 'admin'), createMedicalRecord);

router.get('/:id', getMedicalRecord);

module.exports = router;
