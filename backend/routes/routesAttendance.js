const express = require("express");
const router = express.Router();
const auth_user = require("../middleware/auth_user");
const {
  checkInUser,
} = require("../controller/attendance.controller");


router.post("/checkin",auth_user, checkInUser);

module.exports = router;
