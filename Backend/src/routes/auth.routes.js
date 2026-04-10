const express = require("express");
const router = express.Router();
const { signup, login, updatePassword } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;