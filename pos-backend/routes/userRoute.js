const express = require("express");
const router = express.Router();

//Authentication Routes
router.route("/register").post();
router.route("/login").post();

module.exports = router;