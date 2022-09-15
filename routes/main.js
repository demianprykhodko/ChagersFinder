const express = require("express");
const router = express.Router();

const { getAllChargers } = require("../controllers/main");

router.route('/').get(getAllChargers);

module.exports = router;