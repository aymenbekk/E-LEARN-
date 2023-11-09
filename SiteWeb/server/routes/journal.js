const express = require("express");
const router = express.Router();

const {sendJournal, getSentJournals, getReceivedJournals } = require("../controller/teacher/journal")


router.post('/send_journal', sendJournal)
router.get('/get_sentJournals', getSentJournals)
router.get('/get_receivedJournals', getReceivedJournals)

module.exports = router;
