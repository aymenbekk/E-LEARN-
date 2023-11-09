const express = require("express");
const router = express.Router();

const {getSubjectChapters, createChapter, renameChapter } = require("../controller/teacher/chapter")


router.post('/get_subjectChapters', getSubjectChapters)
router.post('/create_chapter', createChapter)
router.post('/rename_chapter', renameChapter)

module.exports = router;
