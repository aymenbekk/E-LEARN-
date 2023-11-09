const express = require("express");
const router = express.Router();

const { createNote, getNotes, getNote, updateNote, deleteNote } = require("../controller/common/note")



router.post('/create', createNote);
router.get('/notes_by_user_id', getNotes);
router.get('/note_by_id', getNote);
router.post('/updateNote', updateNote);
router.post('/deleteNote', deleteNote)

module.exports = router;
