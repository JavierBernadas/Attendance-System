import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import Drawer from "../pages/DahsboardDrawer/Drawer";
import Attendance from "../pages/Attendance";
import ErrorPage from "../pages/OtherPage/ErrorPage";
import ProtectedRoute from "../components/Context/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import Leaves from "../pages/Leaves";
import Users from "../pages/Users";
import TestFinal from "../pages/TestFinal";
const router = createBrowserRouter([

  {

    path: "/main",
    element: (
      <ProtectedRoute>
        <Drawer />
      </ProtectedRoute>
    ),

  children: [
    {
      // first render in the dashboard ! ! !
      index: true, // 👉 renders at /main by default ! ! 
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },

    {
      path: "profile",
      element: <UserProfile />,
    },
    {
      path: "attendance",
      element: <Attendance />,
    },
    {
      path: "leaves",
      element: (
        <ProtectedRoute allowedRoles={['superadmin','admin']}>
          <Leaves />
        </ProtectedRoute>
      ),
    },
        {
      path: "users",
      element: (
        <ProtectedRoute allowedRoles={['superadmin','admin']}>
          <Users />
        </ProtectedRoute>
      ),
    },
       
  ],
}
,
  
  {
    path: "final",
    element: <TestFinal />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
