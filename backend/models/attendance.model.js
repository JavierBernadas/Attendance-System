const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // links to the User model
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now, // automatically today's date
    },
    checkIn: {
      type: Date,
      required: false, // may be filled when the user logs in
    },
    checkOut: {
      type: Date,
      required: false, // filled when the user logs out
    },
    status: {
      type: String,
      // enum: ["Present", "Absent", "Late", "Half-Day"],
      enum: ["Present", "Absent"],
      default: "Present",
    },
    remarks: {
      type: String,
      required: false, // optional notes
    },
  },
  {
    timestamps: true, // will give createdAt & updatedAt
  }
);

const Attendance = mongoose.model("attendance", attendanceSchema);
module.exports = Attendance;
