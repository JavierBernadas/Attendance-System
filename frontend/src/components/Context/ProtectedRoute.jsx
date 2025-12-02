import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../pages/OtherPage/Loading';
const ProtectedRoute = ({children }) => {

 const { isLoggedIn ,loading } = useAuth();

 if (loading) {
  console.log("Loading from protected routes : " , loading)
  return <Loading/>; // or a spinner
}
  if (!isLoggedIn) {
    console.log(isLoggedIn + " :  isLoggedIn")
    return <Navigate to="/" replace />;
  }

   return children; 
   // Render children components
}

export default ProtectedRoute