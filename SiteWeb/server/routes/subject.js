const express = require("express");
const router = express.Router();

const { getStudentSubjects, getSubjects, createSubject, updateSubject, getSubjectByID, getAllSubjects, deleteSubject } = require("../controller/admin/Gestion/subject")


router.post('/get_subjects', getSubjects)
router.get('/get_allSubjects', getAllSubjects);
router.post('/create_subject', createSubject)
router.post('/update_subject', updateSubject)
router.post('/delete_subject', deleteSubject)
router.get('/get_student_subjects', getStudentSubjects);




module.exports = router;
