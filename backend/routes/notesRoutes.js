const express = require('express');
const router = express.Router();
const {getNotes,createNotes,updateNotes,deleteNotes, getGroups} = require('../controllers/notesController.js');

router.get('/groups/:userId',getGroups);
router.get('/notes/:userId/:groupId',getNotes);
router.post('/notes',createNotes);
router.put('/notes/:userId/:groupId',updateNotes);
router.delete('/notes/:userId/:groupId',deleteNotes);
module.exports = router;