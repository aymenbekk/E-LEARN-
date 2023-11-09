const express = require("express");
const router = express.Router();

const {getSalles, createSalle, deleteSalle } = require("../controller/admin/Gestion/salle")


router.get('/get_salles', getSalles)
router.post('/create_salle', createSalle)
router.post('/delete_salle', deleteSalle)

module.exports = router;
