const express = require('express');
const { body } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, getProfile);

router.put('/profile', [
  auth,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email')
], updateProfile);

module.exports = router;