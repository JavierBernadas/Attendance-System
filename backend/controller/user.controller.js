const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
//Done
const postUser = async (req, res) => {
  try {
    const { role, firstName, lastName, age, password, email } = req.body;
    const creatorId = req.user._id;
    const creatorRole = req.user.role;
    const creatorName = req.user.firstName;
    console.log("create user req: ", creatorId);

    // ✅ Email validation
    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // ✅ Password length check
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    // ✅ Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userData = {
      role,
      firstName,
      lastName,
      age,
      //Reminder lang Javier Check this Code ! ! !
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      createdBy: {
        userId: creatorId,
        name: creatorName,
        role: creatorRole,
      },
    };

    const user = await User.create(userData);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(" Error : ", postUser);

    res.status(500).json({ message: error.message });
  }
};
//Done
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //pangita ang email if naa ba sa backend ! ! !
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Wrong credentials Email!.");
      return res.status(400).json({ message: "Wrong credentials." });
    }
    // compare password input and from the email user found password ! ! !
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Wrong credentials Password.");
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, secret, {
      expiresIn: "1h",
    });

    console.log("Login Successfully");

    return res.status(200).json({ message: "Login Successfully", token, user }); // Include the token in the response  ! ! !
  } catch (error) {
    console.log(" Error : ", login);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
//Done !
const deletetUser = async (req, res) => {
  try {
    const { id } = req.params;
    const requestingUser = req.user;
    // Find the user to be deleted
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ message: "User ID not found." });
    }

    // Check the roles of the user to be deleted and the requesting user
    const requestingUserRole = requestingUser.role;
    const userToDeleteRole = userToDelete.role;

    // Prevent admins from deleting other admins or superadmins
    if (userToDeleteRole === "admin" && requestingUserRole == "admin") {
      return res.status(403).json({
        message: "Forbidden. Admins cannot delete other admins!.",
      });
    }

    // Delete the user if the conditions are met
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User Successfully deleted." });
  } catch (error) {
    console.log(" Error : ", deletetUser);
    res.status(500).json({ message: error.message });
  }
};
//http://localhost:{{port}}/user/users?page=2&limit=5
//Done !
const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const requestingUserRole = req.user.role;

    // 🔢 Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};

    if (requestingUserRole === "superadmin") {
      // superadmin can see all except themselves
      filter = { _id: { $ne: currentUserId } };
    } else if (
      requestingUserRole === "admin" ||
      requestingUserRole === "manager"
    ) {
      // admin/manager can only see users they created/assigned
      filter = { "createdBy.userId": currentUserId };
    }

    const totalUsers = await User.countDocuments(filter);
    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-password")
      .lean();

    return res.status(200).json({
      total: totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    console.log(" Error : ", getAllUsers);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
//Done !
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // safer than req.params.id

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No user ID found." });
    }

    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(" Error : " , getMyProfile)
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};
//Done !
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // check ID if provided ! ! !
    if (!id) {
      return res.status(400).json({ message: "Provide ID!" });
    }
    const data = req.body;
    // Find the user by ID to get the current password
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // ✅ Check for sensitive changes (non-admins only)
    const isSensitiveChange = data.email || data.name || data.newPassword;
    if (isSensitiveChange && !data.currentPassword) {
      return res.status(400).json({
        message:
          "Current password is required to update email, name, or password.",
      });
    }
    // Verify the provided current password if any sensitive information is being updated
    if (data.currentPassword) {
      const isPasswordCorrect = bcrypt.compareSync(
        data.currentPassword,
        user.password
      );

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      if (data.newPassword) {
        // Check password length manually
        if (data.newPassword.length < 8) {
          return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long." });
        }

        // Hash and assign password
        data.password = await bcrypt.hash(data.newPassword, 10);

        // Remove newPassword to avoid accidentally saving it
        delete data.newPassword;
      }

      // Remove currentPassword from the data object
      delete data.currentPassword;
    }

    // Check if the data object is the same as the user object
    const isUnchanged = Object.keys(data).every((key) => {
      if (key === "password") {
        // Special handling for password comparison
        return bcrypt.compareSync(data[key], user[key]);
      }
      return user[key] === data[key];
    });

    if (isUnchanged) {
      return res.status(200).json({ message: "User not modified" });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    const response = {
      message: "Successfully Updated.",
      user: updatedUser,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.log("Error : " ,updateUser )
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};
// this data inside is just for checking ! ! !
const dataInside = async (req, res) => {
  const requestInfo = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    path: req.path,
    url: req.url,
    ip: req.ip,
    cookies: req.cookies || "No cookies middleware",
    user: req.user || "No user attached",
  };

  res.status(200).json({
    message: "Here's your request data CHECK ! ! !",
    requestInfo,
  });
};
module.exports = {
  postUser,
  login,
  deletetUser,
  getAllUsers,
  updateUser,
  dataInside,
  getMyProfile,
};
