const express = require("express");
const router = express.Router();

const {upload, uploadFile, getSubjectFiles, downloadFile } = require("../controller/teacher/file")


router.post('/upload_file', upload.single("file"), uploadFile)
router.post('/get_subjectFiles', getSubjectFiles)
router.get('/download_file', downloadFile)

module.exports = router;
