import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

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
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   age: "",
  //   role: "",
  //   email: "",
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessageResponse, setErrorMessageResponse] = useState("");
  const onSubmit = async (user_inputs, event) => {
    event.preventDefault(); // prevent refresh form !
    setIsLoading(true);
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
            User's Details
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                className={`block w-full rounded-lg p-2.5 text-sm shadow-sm bg-gray-50 
    border ${
      errors.firstName
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    } text-gray-900`}
                {...register("firstName", {
                  required: "First Name is required",
                  onChange: () => setErrorMessageResponse(""),
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
                placeholder="Your First name"
              />

              {errors.firstName && (
                <div className="mt-2 rounded-md  bg-red-50 p-2">
                  <p className="text-sm font-medium text-red-700">
                    {errors.firstName.message}
                  </p>
                </div>
              )}
            </div>
            {/* Last Name */}
            <div className="mb-2">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                className={`block w-full rounded-lg p-2.5 text-sm shadow-sm bg-gray-50 
    border ${
      errors.lastName
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    } text-gray-900`}
                {...register("lastName", {
                  required: "Last name  is required",
                  onChange: () => setErrorMessageResponse(""),
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
                placeholder="Your Last name"
              />

              {errors.lastName && (
                <div className="mt-2 rounded-md  bg-red-50 p-2">
                  <p className="text-sm font-medium text-red-700">
                    {errors.lastName.message}
                  </p>
                </div>
              )}
            </div>
            {/* Age */}
            <div className="mb-2">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                autoComplete="age"
                className={`block w-full rounded-lg p-2.5 text-sm shadow-sm bg-gray-50 
    border ${
      errors.age
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    } text-gray-900`}
                {...register("age", {
                  required: "Age name  is required",
                  onChange: () => setErrorMessageResponse(""),
                })}
                aria-invalid={errors.age ? "true" : "false"}
                placeholder="Your Age"
              />

              {errors.age && (
                <div className="mt-2 rounded-md  bg-red-50 p-2">
                  <p className="text-sm font-medium text-red-700">
                    {errors.age.message}
                  </p>
                </div>
              )}
            </div>
            {/* Role */}
            <div className="mb-2">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <select
                type="text"
                id="role"
                name="role"
                autoComplete="role"
                className={`block w-full rounded-lg p-2.5 text-sm shadow-sm bg-gray-50 
    border ${
      errors.role
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    } text-gray-900`}
                {...register("role", {
                  required: "Role is required",
                  onChange: () => setErrorMessageResponse(""),
                })}
                aria-invalid={errors.role ? "true" : "false"}
                placeholder="Your Role"
              >
                <option value="">Select role</option>
                {/* <option value="user">User</option>
                <option value="admin">Admin</option> */}
                <option value="manager">Manager</option>
              </select>
              {errors.role && (
                <div className="mt-2 rounded-md  bg-red-50 p-2">
                  <p className="text-sm font-medium text-red-700">
                    {errors.role.message}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <Stack
              spacing={1}
              direction="row"
              sx={{ justifyContent: "flex-end" }}
            >
              <Button
                type="submit"
                loading={isLoading}
                // loadingIndicator="Logging in..."
                disabled={isLoading}
                variant="contained"
              >
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
