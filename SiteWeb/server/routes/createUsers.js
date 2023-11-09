
const express = require("express");
const router = express.Router();

const { createStudent, createTeacher } = require("../controller/admin/manageUser"); 
const { createStudents, createTeachers } = require("../controller/uploadUsers"); 
const { requireSignin, isAdmin } = require("../controller/common/checkToken"); 

const {upload} = require("../controller/uploadUsers");

router.post('/student', requireSignin, isAdmin, (req,res) => createStudent);
router.post('/teacher', requireSignin, isAdmin, (req,res) => createTeacher);

router.post('/students', upload.single('students') , createStudents);
//router.post('/teachers', requireSignin, isAdmin, createTeachers);

router.post('/teachers', upload.single('teachers'), createTeachers);


module.exports = router;