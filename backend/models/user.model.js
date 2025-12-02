const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
      min: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user", "superadmin", "manager"],
      default: "user",
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your Email."],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid email address! - from USER MODEL TO CHECK ! `,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    // ✅ Embedded object for creator info
    createdBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
        required: false,
      },
      role: {
        type: String,
        enum: ["admin", "superadmin", "manager"],
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
