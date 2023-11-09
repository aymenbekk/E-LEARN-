const express = require('express');
const controller = require('../controller/accessRight');
var router = express.Router();




router.get('/assignTeacherToSubject', controller.assignTeacherToSubject);
router.post('/searchForTeacher', controller.searchTeacher);
router.post('/searchForTeacher/assign', controller.assignTeacherNOWToSubject);


module.exports = router;