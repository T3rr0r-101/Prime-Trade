const express = require('express');
const { body } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getTasks);

router.post('/', [
  auth,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high'])
], createTask);

router.put('/:id', [
  auth,
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high'])
], updateTask);

router.delete('/:id', auth, deleteTask);

module.exports = router;