const express = require("express");
const merchController = require("../controllers/merch");
const isAuth = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/api/merch", isAuth, isAdmin, merchController.updateMerch);

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
