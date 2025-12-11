import { Navigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_LOCAL_HOST;

//check api base ! ! !
console.log("API_BASE_URL : " + API_BASE_URL);
const UserAPI = {
  Login: async (loginData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(loginData),
      });
      // make the return json ! ! !
      const responseBody = await response.json();
    

      //check first ! ! !
      if (!response.ok) {
        throw new Error(responseBody.message || "Request failed!");
      }
      // for Success ! ! !
      return {
        userData: responseBody,
      };
    } catch (error) {
      console.error("Login error:", error);
      // Distinguish network error vs API error
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        console.error("⚠️ No internet connection or server unreachable");
        throw new Error("No connection. Try again.");
      } else {
        console.error("Login error:", error.message);
        throw error;
      }
    }
  },
  GetUsers: async (token, pages, limit, searchData) => {
    console.log("From API = page :", pages, "Limit :", limit);
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/users?page=${pages}&limit=${limit}&search=${searchData}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // make the return json ! ! !
      const responseBody = await response.json();
      console.log("responseBody : ", responseBody);
      //if token expired
      if (response.status === 401) {
        return { error: "Not authenticated" };
      }
      //check first if ok ! ! !
      if (!response.ok) {
        throw new Error(responseBody.message || "Request failed!");
      }
      // for Success ! ! !
      return {
        userData: responseBody,
      };
    } catch (error) {
      console.error("Getting User's error:", error);
      throw error.message;
    }
  },
  PosstUsers: async (token, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      // make the return json ! ! !
      const responseBody = await response.json();
        //if token expired
      if (response.status === 401) {
        return { error: "Not authenticated" };
      }
      //check first ! ! !
      if (!response.ok) {
        throw new Error(responseBody.message || "Request failed!");
      }
      // for Success ! ! !
      return {
        userData: responseBody,
      };
    } catch (error) {
      console.error("Post User's error:", error);
      throw error;
    }
  },
  DeleteUser: async (token , user_id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/deleteUser/${user_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseBody = await response.json();

         //if token expired
      if (response.status === 401) {
        return { error: "Not authenticated" };
      }
      //check first if ok ! ! !
      if (!response.ok) {
        throw new Error(responseBody.message || "Delete failed!");
      }
      // for Success ! ! !
      return {
        userData: responseBody,
      };

    } catch (error) {
       console.error("Delete User error:", error);
      throw error.message;
    }
  },
};
export default UserAPI;
