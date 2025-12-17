import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function CreateUser({ open, onClose, newUserData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    role: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  onClose(); 
  try {
    // Call parent function to create user
    await newUserData(formData);
    // Reset form after successful submit
    resetForm();
  } catch (error) {
    // Reset form even on error
    resetForm();
  }
};

// Utility function to reset form fields
const resetForm = () => {
  setFormData({
    firstName: "",
    lastName: "",
    age: "",
    role: "",
    email: "",
  });
};

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="mb-4 text-center font-semibold"
          >
            Create User
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Age */}
            <div className="mb-3">
              <label
                htmlFor="age"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label
                htmlFor="role"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select role</option>
                {/* <option value="user">User</option>
                <option value="admin">Admin</option> */}
                <option value="manager">Manager</option>

              </select>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@flowbite.com"
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {/* Action Buttons */}
            <Stack
              spacing={1}
              direction="row"
              sx={{ justifyContent: "flex-end" }}
            >
              <Button type="submit" variant="contained">
                Create
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
