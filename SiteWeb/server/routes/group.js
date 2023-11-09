const express = require("express");
const router = express.Router();

const {getAllGroups, createGroup, updateGroup, deleteGroup, getPromoGroups } = require("../controller/admin/Gestion/group")


router.get('/get_all_groups', getAllGroups)
router.post('/create_group', createGroup)
router.post('/update_group', updateGroup)
router.post('/delete_group', deleteGroup)
router.get('/get_promo_groups', getPromoGroups)

module.exports = router;
