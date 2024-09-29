const express = require("express");
const merchController = require("../controllers/merch");
const userController = require("../controllers/user");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/api/merch", merchController.getAllMerch);
router.get("/api/merch/:merchId", merchController.getSingleMerch);
router.get("/api/collections/:collection", merchController.getCollections);
router.get(
  "/api/orders/user/:email",
  isAuthenticated,
  userController.getOrderHistory
);
router.post("/api/forgot-password", userController.forgotPassword);
router.post("/api/reset-password/:token", userController.resetPassword);
router.post("/api/order", userController.placeOrder);
module.exports = router;
