const express = require("express");
const merchController = require("../controllers/merch");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/api/merch", merchController.getAllMerch);
router.get("/api/merch/:merchId", merchController.getSingleMerch);
router.get("/api/collections/:collection", merchController.getCollections);

router.post("/api/order", userController.placeOrder);
module.exports = router;
