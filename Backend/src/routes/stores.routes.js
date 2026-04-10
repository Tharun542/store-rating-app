const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const { createStore, getAllStores } = require("../controllers/store.controller")
const { User } = require("../models");

router.get("/test", auth, (req, res) => {
    res.json({
        message: "protected route",
        user: req.user
    });
});

// real API save to DB
router.post("/create-store", auth, role(["OWNER"]), createStore);

// get all stores logged in users

router.get("/all", auth, getAllStores);
module.exports = router;