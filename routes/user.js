const express = require("express");
const merchController = require("../controllers/merch");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/api/merch", merchController.getAllMerch);
router.get("/api/merch/:merchId", merchController.getSingleMerch);
router.post(
  "/api/transaction/initialize",
  adminController.initializeTransaction
);
router.post(
  "/api/transaction/verify/:reference",
  adminController.verifyTransaction
);

router.post("/api/order", userController.placeOrder);
module.exports = router;
