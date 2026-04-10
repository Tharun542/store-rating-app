const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const {
  getAdminDashboard,
  getUsers,
  createUser,
  getStores
} = require("../controllers/admin.controller");

router.get("/dashboard", auth, getAdminDashboard);
router.get("/users", auth, getUsers);
router.post("/create-user", auth, createUser);
router.get("/stores", auth, getStores);

module.exports = router;