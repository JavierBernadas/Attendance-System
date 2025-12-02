const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

function defineAbilitiesFor(user) {
  const { role } = user;
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  if (role === "superadmin") {
    can("manage", "all"); // everything
  }

  if (role === "admin") {
    // User Management
    can("create", "User", { role: { $in: ["manager", "user"] } });
    can(["read", "update", "delete"], "User");
    cannot("create", "User", { role: { $in: ["superadmin", "admin"] } });
    cannot("delete", "User", { role: { $in: ["superadmin", "admin"] } });

    // Attendance Management
    can("manage", "Attendance");
    // Profile
    can("update", "User", { _id: user._id });
  }

  if (role === "manager") {
    // User Management
    can("create", "User", { role: "user" });
    //manager role can delete lang sa mga user nga siya ang nag buhat !
    can(["read", "update", "delete"], "User", { createdBy: user._id });
    // Attendance Management
    //maka update ug create lang siya sa attendance sa iyang user nga siya ang nag create !
    can(["create", "update"], "Attendance", { user: user._id });
    can("read", "Attendance", { createdBy: user._id });
    // Profile
    can("update", "User", { _id: user._id });
  }

  if (role === "user") {

    // Attendance Management
    can(["create", "update"], "Attendance", { user: user._id });

    can("read", "Attendance", { user: user._id });
    
    // Profile
    can(["read", "update"], "User", { _id: user._id });

  }

  return build();
}

module.exports = defineAbilitiesFor;
