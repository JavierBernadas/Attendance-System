const bcrypt = require("bcrypt");
const Attendance = require("../models/attendance.model");
// const defineAbilitiesFor = require("../permissions/defineAbilities");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// checkin ! ! !
const checkInUser = async (req, res) => {
 try {
    const currentUserId = req.user._id;

    console.log("currentUserId: " , currentUserId)

 const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date(todayStart);
todayEnd.setHours(23, 59, 59, 999);

const existing = await Attendance.findOne({
  user: currentUserId,
  date: { $gte: todayStart, $lte: todayEnd }
});
    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const record = new Attendance({
      user: currentUserId,
      date: new Date(),
      checkIn: new Date(),
      status: "Present"
    });

    await record.save();
    res.json({ message: "Check-in successful", data: record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkInUser, };
