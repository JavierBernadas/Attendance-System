// const SignIn = () => {
//   const [buttonStatus, setButtonStatus] = useState(false);
//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });
//   //navigate using route ! ! !
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const validateField = (name, value) => {
//     switch (name) {
//       case "email":
//         if (!value) return "Email is required";
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           return "Please enter a valid email address";
//         return "";

//       case "password":
//         if (!value) return "Password is required";
//         if (value.length < 7) return "Password must be at least 7 characters";
//         return "";

//       default:
//         return "";
//     }
//   };
// //validation 1
//   const validateForm = (formData) => {
//     const newErrors = {};
//     for (const [name, value] of Object.entries(formData)) {
//       const error = validateField(name, value);

//       if (error) newErrors[name] = error;
//     }
//     return newErrors;
//   };
//   const handleLSubmit = async (event) => {

//     // console.log(event , "onSubmit")
//     event.preventDefault();
//     setButtonStatus(true);
//     //validation 2

//     const formErrors = validateForm(userData);

//     if (Object.keys(formErrors).length > 0) {
//       console.log(formErrors);
//       setErrors(formErrors);
//       setButtonStatus(false);
//       return;
//     }

//     try {
//       console.log(`userData  :  ${userData}`);
//       const response = await UserAPI.Login(userData);
//       //avoid multiple clicks ! ! !
//       console.log(response.status);
//       const userRole = response.userData.user.role;
//       const userFirstName = response.userData.user.firstName;
//       const userLastName = response.userData.user.lastName;
//       const userFullName = `${userFirstName} ${userLastName}`

//       const token = response.userData.token;

//       //set lang to the char ! ! ! timeout !
//       setTimeout(() => {
//         login(token, userRole ,userFullName);
//         navigate("/main");
//       }, 5000);

//     } catch (error) {
//       console.log(error);
//       setButtonStatus(false);
//       notifyError(error.message || "Login failed");
//     }
//   };

//   const onChangeInput = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     const error = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   //style for the button ! !
//   const buttonStyles = {
//     width: "100%", // "w-full"
//     margin: "12px 0", // "my-3" (3 in Tailwind ≈ 12px)
//     backgroundColor: "#1d4ed8", // "bg-blue-700"
//     color: "white", // "text-white"
//     fontWeight: "bold",
//     "&:hover": {
//       backgroundColor: "#1e40af", // "hover:bg-blue-800"
//     },
//     "&:focus": {
//       outline: "none", // "focus:outline-none"
//       boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.5)", // "focus:ring-4 focus:ring-blue-300" (corrected `ring` to `boxShadow`)
//     },
//     borderRadius: "8px", // "rounded-lg" (lg ≈ 8px)
//     fontSize: "13px", // "text-sm" (14px)
//     padding: "7px 10px", // "px-5 py-2.5" (5 ≈ 20px, 2.5 ≈ 10px)
//     textAlign: "center", // "text-center"
//     display: "inline-block", // "inline-block"
//   };

//   return (
//     <form onSubmit={handleLSubmit} className="flex items-center justify-center min-h-screen bg-gray-100">

//       <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           Welcome Back!
//         </h2>
//         <h6>
//       superadmin@superadmin.com
//   </h6>
//   <h6>admin@admin.com</h6>
//         <div className="mb-5">
//           <label
//             htmlFor="email"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Your email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userData.email}
//             onChange={onChangeInput}
//             autoComplete="username"
//             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             placeholder="name@flowbite.com"
//             required
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//           )}
//         </div>

//         <div className="mb-2">
//           <label
//             htmlFor="password"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Your password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={onChangeInput}
//               autoComplete="current-password"
//             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             required
//           />
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//           )}
//         </div>

//         <div className="flex items-center mb-2">
//           <a href="/sign-up" className="text-blue-600 hover:underline">
//             Forgot password ?
//           </a>
//         </div>
//         <Button
//         type="submit"
//           className="w-full"
//           loading={buttonStatus}
//           loadingIndicator="Logging in..."
//           variant="contained" // Makes it solid (like Tailwind's bg-blue-700)
//           sx={buttonStyles}
//         >
//           Login
//         </Button>
//       </div>
//       <ToastContainer />
//     </form>
//   );
// };

// export default SignIn;
//           // onClick={handleLSubmit}
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useState } from "react";
import UserAPI from "../../api/user_api";
import { notifyError } from "../Toastify/notifications";
import { ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //navigate using route ! ! !
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (userInputs, event) => {
    event.preventDefault(); // prevent refresh form !
    setIsLoading(true);

    try {
      
      console.log(`User Inputs   :  ${userInputs}`);
      const response = await UserAPI.Login(userInputs);

      const userRole = response.userData.user.role;
      const userFirstName = response.userData.user.firstName;
      const userLastName = response.userData.user.lastName;
      const userFullName = `${userFirstName} ${userLastName}`;

      const token = response.userData.token;

      await new Promise(resolve => setTimeout(resolve, 5000));
      // for storing data ! 
      login(token, userRole, userFullName);
        navigate("/main");
      //set lang to the char ! ! ! timeout !
      // setTimeout(() => {
      //   login(token, userRole, userFullName);
      //   navigate("/main");
      // }, 5000);
    } catch (error) {
      console.log(error.message);
      notifyError(error.message || "Login failed");
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Welcome Back!
        </h2>
        <h6>superadmin@superadmin.com</h6>
        <h6>admin@admin.com</h6>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("email", { required: "Email Address is required" })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="name@flowbite.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("password", { required: "Password is required" })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center mb-2">
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Forgot password ?
          </a>
        </div>
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          // loadingIndicator="Logging in..."
          disabled={isLoading}
          variant="contained"
        >
          Login
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default SignIn;
