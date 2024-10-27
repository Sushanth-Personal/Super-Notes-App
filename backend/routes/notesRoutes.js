const express = require('express');
const router = express.Router();
const {getNotes,createNotes,updateNotes,deleteNotes} = require('../controllers/notesController.js');

router.get('/notes/:id?',getNotes);
router.post('/notes/',createNotes);
router.put('/notes/:id',updateNotes);
router.delete('/notes/:id',deleteNotes);
module.exports = router;