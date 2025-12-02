import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AuthProvider } from "./components/Context/AuthProvider";

function App() {
  return (
    <>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
      </AuthProvider>
    </>
  );
}

export default App;
