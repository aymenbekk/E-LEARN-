const express = require("express");
const router = express.Router();

const {getAllTeachers, getSubjectTeachers, getTeacherSubjects, createTeacher, updateTeacher, deleteTeacher, affectSubjectToTeacher } = require("../controller/admin/Gestion/teacher")

router.get('/get_allTeachers', getAllTeachers)
router.get('/get_teacherSubjects', getTeacherSubjects)
router.get('/get_subjectTeachers', getSubjectTeachers)
router.post('/create_teacher', createTeacher)
router.post('/update_teacher', updateTeacher)
router.post('/delete_teacher', deleteTeacher)
router.post('/affect_subjectTeacher', affectSubjectToTeacher)


module.exports = router;
