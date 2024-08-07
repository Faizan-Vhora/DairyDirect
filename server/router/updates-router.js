const express = require("express");
const router = express.Router();
const updatesController = require("../controllers/updates-controller");


// -----------------------
// Get Latest data route
// -----------------------
router.route("/today-updates/latest").get( updatesController.getLastTodayUpdates);

module.exports = router;