const express = require("express");
const merchController = require("../controllers/merch");

const router = express.Router();

router.get("/api/merch", merchController.getAllMerch);
router.get("/api/merch/:merchId", merchController.getSingleMerch);

module.exports = router;
