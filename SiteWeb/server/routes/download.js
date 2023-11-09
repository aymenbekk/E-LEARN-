const express = require("express");
const {downloadSubject, showRessources} = require("../controller/downloadRessources")
const { requireSignin } = require("../controller/common/checkToken");

const router = express.Router()

router.post('/file' , downloadSubject)


router.get('/get_files', showRessources)


module.exports = router;