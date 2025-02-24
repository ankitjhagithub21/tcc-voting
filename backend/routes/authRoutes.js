const express = require("express");
const { login,register,getProfile,logout, verifyUser, sendVerificationLink } = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/profile", auth, getProfile);
router.post("/send-link", auth, sendVerificationLink);
router.get("/verify/:token",auth, verifyUser);

module.exports = router;
