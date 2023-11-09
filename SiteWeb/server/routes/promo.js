const express = require("express");
const router = express.Router();

const { createPromo, getPromos, getPromoByID} = require("../controller/admin/promo")



router.post('/create_promo', createPromo);
router.get('/get_promos', getPromos);
router.get('/get_promoByID', getPromoByID);


module.exports = router;
