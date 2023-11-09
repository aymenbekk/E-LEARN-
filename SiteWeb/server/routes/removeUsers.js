const express = require("express");
const router = express.Router();
const  {removeUser} = require("../controller/admin/manageUser");


 router.delete('/delete-user', removeUser);



module.exports = router
