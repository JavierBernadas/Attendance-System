const express = require("express");
const router = express.Router();
const auth_user = require("../middleware/auth_user");
const checkAbility = require("../middleware/checkAbility");
const {
  postUser,
  login,
  deletetUser,
  getAllUsers,
  updateUser,
  dataInside,
  getMyProfile
} = require("../controller/user.controller");
//POST User - admin - superadmin - user ! ! !
router.delete("/deleteUser/:id", auth_user, checkAbility("delete", "User"), deletetUser);
router.put("/updateUser/:id", auth_user,checkAbility("update", "User"), updateUser);

router.post("/users",auth_user, getAllUsers);
router.get("/users/myProfile",auth_user, getMyProfile);

router.post("/signup",auth_user, checkAbility("create", "User"), postUser);
router.post("/login",login);
//test routes data inside req and res ! ! !
router.post("/dataTest/:id",auth_user, dataInside);

module.exports = router;
