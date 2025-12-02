const cron = require("node-cron");
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");
//For testing TEST ! ! !
    // cron.schedule("* * * * *", () => {
    // console.log("Running a task every minute:", new Date().toLocaleString());
    // });
//For testing TEST - END  ! ! !
// Every 24hrs check ! ! !
// cron.schedule("59 23 * * *", async () => { 
//     // runs at 23:59 every day
//   const todayStart = new Date();
//   todayStart.setHours(0, 0, 0, 0);

//   const todayEnd = new Date(todayStart);
//   todayEnd.setHours(23, 59, 59, 999);

//   const users = await User.find({});
//   for (const user of users) {
//     const hasAttendance = await Attendance.findOne({
//       user: user._id,
//       date: { $gte: todayStart, $lte: todayEnd }
//     });

//     if (!hasAttendance) {
//       await Attendance.create({
//         user: user._id,
//         date: new Date(),
//         status: "Absent"
//       });
//     }
//   }

//   console.log("Absent records inserted for users who didn't check in today");
// });


// //------check for every 4PM 
// cron.schedule("0 16 * * *", async () => { 
//   // runs every day at 16:00 (4:00 PM)

//   const todayStart = new Date();
//   todayStart.setHours(0, 0, 0, 0);

//   const todayEnd = new Date(todayStart);
//   todayEnd.setHours(23, 59, 59, 999);

//   const users = await User.find({});
//   for (const user of users) {
//     const hasAttendance = await Attendance.findOne({
//       user: user._id,
//       date: { $gte: todayStart, $lte: todayEnd }
//     });

//     if (!hasAttendance) {
//       await Attendance.create({
//         user: user._id,
//         date: new Date(),
//         status: "Absent"
//       });
//     }
//   }

//   console.log("Absent records inserted for users who didn't check in today");
// });
