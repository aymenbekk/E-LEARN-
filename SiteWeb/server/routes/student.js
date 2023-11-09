const express = require("express");
const router = express.Router();

const {getStudents, createStudent, updateStudent, deleteStudent } = require("../controller/admin/Gestion/student")


router.get('/get_students', getStudents)
router.post('/create_student', createStudent)
router.post('/update_student', updateStudent)
router.post('/delete_student', deleteStudent)

module.exports = router;
