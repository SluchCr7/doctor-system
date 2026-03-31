const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { appointmentValidations } = require('../validations/schemas');

router.use(protect);

router.post('/', validate(appointmentValidations.create), bookAppointment);
router.get('/', getAppointments);
router.patch('/:id', validate(appointmentValidations.update), updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
