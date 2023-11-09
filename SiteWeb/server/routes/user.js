const express = require("express");
const router = express.Router();

const { getStudent } = require("../controller/common/getUser")

router.get('/student_by_email', getStudent);

module.exports = router;