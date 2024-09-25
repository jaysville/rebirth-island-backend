const express = require("express");
const merchController = require("../controllers/merch");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/api/merch", merchController.getAllMerch);
router.get("/api/merch/:merchId", merchController.getSingleMerch);
router.post(
  "/api/transaction/initialize",
  userController.initializeTransaction
);
router.post(
  "/api/transaction/verify/:reference",
  userController.verifyTransaction
);

router.post("/api/order", userController.placeOrder);
module.exports = router;
