const { Router } = require("express");
const authController = require("../controllers/auth");
const { registerValidator, loginValidator } = require("../utils/validators");
const router = Router();

router.post(
  "/api/auth/register",
  registerValidator,
  authController.registerUser
);

router.post("/api/auth/login", loginValidator, authController.loginUser);

module.exports = router;
