const {uploader} = require('../controller/uploadRessources');
const {upload} = require('../controller/uploadRessources');
const { requireSignin } = require("../controller/common/checkToken");



const express = require("express");

const router = express.Router()


router.post('/upload_file', upload.single("file") , uploader);


module.exports = router;

