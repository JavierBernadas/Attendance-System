const API_BASE_URL = import.meta.env.VITE_LOCAL_HOST;
// KULANG UPDATE PASSWORD / Change PASSWORD ! 


//CHECK API BASE URL !
console.log("API_BASE_URL : " + API_BASE_URL);

  // Login User !
const UserAPI = {
  Login: async (user_data) => {
    try {
      const apiResponse = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user_data),
      });
      // make the return json ! ! !
      const result = await apiResponse.json();

      //check first ! ! !
      if (!apiResponse.ok) {
        console.log(result , "haha")
        throw new Error(result.message || "Login failed!");
      }

      // 🟢 Success
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Login error : ", error);
      return {
        success: false,
        errorType: "network",
        message: error.message,
      };
    }
  },
  //  Get Users !
  GetUsers: async (token, pages, limit, search_data) => {
    try {
      const apiResponse = await fetch(
        `${API_BASE_URL}/user/users?page=${pages}&limit=${limit}&search=${search_data}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await apiResponse.json();
      // 🔐 Token expired
      if (apiResponse.status === 401) {
        return {
          success: false,
          errorType: "auth",
          message: "Not authenticated",
        };
      }

      // ❌ API returned an error
      if (!apiResponse.ok) {
        return {
          success: false,
          errorType: "api",
          message: result.message || "Failed to Get user.",
        };
      }

      // 🟢 Success
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Getting User's error:", error);

      return {
        success: false,
        errorType: "network",
        message: error.message,
      };
    }
  },

  // Create User API - NEW FORMAT
  CreateUser: async (token, new_user_data) => {
    try {
      const apiResponse = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(new_user_data),
      });

      const result = await apiResponse.json();

      // 🔐 Token expired
      if (apiResponse.status === 401) {
        return {
          success: false,
          errorType: "auth",
         message: result.error || "Failed to create user.",
        };
      }

      // ❌ API returned an error
      if (!apiResponse.ok) {
        return {
          success: false,
          errorType: "api",
          message: result.error || "Failed to create user.",
        };
      }

      // 🟢 Success
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("CreateUser API Error:", error);

      return {
        success: false,
        errorType: "network",
        message: error.message,
      };
    }
  },

  // Delete User !
  DeleteUser: async (token, user_id) => {
    try {
      const apiResponse = await fetch(
        `${API_BASE_URL}/user/deleteUser/${user_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await apiResponse.json();

        console.log("result : delete " , result)
      // 🔐 Token expired
      if (apiResponse.status === 401) {
        return {
          success: false,
          errorType: "auth",
          message: result.error,
        };
      }

      // ❌ API returned an error
      if (!apiResponse.ok) {
        return {
          success: false,
          errorType: "api",
          message: result.error || "Failed to delete user.",
        };
      }

      // 🟢 Success
      return {
        success: true,
        data: result,
      };

    } catch (error) {
      console.error("Delete User error:", error);

      return {
        success: false,
        errorType: "network",
        message: error.message
      };
    }
  },
};

export default UserAPI;
