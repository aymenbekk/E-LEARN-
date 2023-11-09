const express = require("express");
const router = express.Router();

const {uploadG, uploadGrade, getSubjectGrade, downloadGrade } = require("../controller/teacher/grade")


router.post('/upload_grade', uploadG.single("file"), uploadGrade)
router.post('/get_subjectGrades', getSubjectGrade)
router.get('/download_grade', downloadGrade)

module.exports = router;
