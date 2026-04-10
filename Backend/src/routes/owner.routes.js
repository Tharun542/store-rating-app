const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const { getOwnerDashboard } = require("../controllers/owner.controller");

// only OWNER can access
router.get("/dashboard", auth, role(["OWNER"]), getOwnerDashboard);

module.exports = router;