const express = require("express");
const merchController = require("../controllers/merch");
const isAuth = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/api/orders", isAuth, isAdmin, adminController.getOrders);
router
  .route("/api/order/:orderId")
  .get(isAuth, adminController.getSingleOrder)
  .post(isAuth, isAdmin, adminController.updateOrderStatus);
router.post("/api/merch", isAuth, isAdmin, merchController.updateMerch);

router.post(
  "/api/transaction/initialize",
  adminController.initializeTransaction
);
router.post(
  "/api/transaction/verify/:reference",
  adminController.verifyTransaction
);

router.post(
  "/api/merch/edit/:merchId",
  isAuth,
  isAdmin,
  merchController.updateMerch
);

router.delete(
  "/api/merch/delete/:merchId",
  isAuth,
  isAdmin,
  merchController.deleteMerch
);
module.exports = router;
