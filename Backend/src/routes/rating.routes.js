const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { addOrUpdateRating } = require("../controllers/rating.controller");

router.post("/", auth, addOrUpdateRating);

module.exports = router;