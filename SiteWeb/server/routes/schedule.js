
const express = require("express");
const router = express.Router();

const { addClass, updateClass, getSchedule, getLastClass, deleteClass, getTeacherClasses } = require("../controller/admin/schedule")


router.post('/getSchedule', getSchedule);
router.post('/addClass', addClass);
router.post('/updateClass', updateClass);
router.post('/getLastClass', getLastClass)
router.post('/deleteClass', deleteClass)
router.post('/get_teacherClasses', getTeacherClasses)

module.exports = router;
