
const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../controller/admin/registerAdmin");
const { registerStudent } = require("../controller/admin/registerStudent");
const { registerTeacher } = require("../controller/admin/registerTeacher");
const { login } = require("../controller/login");
const { requireSignin, isAdmin } = require("../controller/common/checkToken");

router.post('/register/students', requireSignin, isAdmin, registerStudent);
//router.post('/register/admins', registerAdmin);
router.post('/register/teachers', requireSignin, isAdmin, registerTeacher);

router.post('/login', login);


module.exports = router;