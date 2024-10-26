const express = require('express');
const router = express.Router();
const {getNotes,createNotes} = require('../controllers/notesController.js');

router.get('/notes',getNotes);
router.post('/notes',createNotes);

module.exports = router;