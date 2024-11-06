import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  async (config) => {
    const refreshTime = 5000; // Threshold time to refresh the access token
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if(!refreshToken) {
      if(accessToken) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
      return config;
      }
    }
    // If there's no access token, check for the refresh token
    if (!accessToken && refreshToken) {
      try {
        // Attempt to refresh the access token
        await refreshAccessToken(); // Make sure to await the function
        // After refreshing, retrieve the new access token
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        return config; // Return the updated config
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        // Redirect to login page or handle it as needed
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // If both tokens are present, proceed with decoding and checking
    if (accessToken && refreshToken) {
      try {
        const decodedAccessToken = jwtDecode(accessToken);
        const decodedRefreshToken = jwtDecode(refreshToken);

        const accessTokenExpiryTime = decodedAccessToken.exp * 1000 - Date.now();
        const refreshTokenExpiryTime = decodedRefreshToken.exp * 1000 - Date.now();

        if (accessTokenExpiryTime > 0) {
          // Access token is valid
          if (accessTokenExpiryTime < refreshTime) {
            // Access token is close to expiring, refresh it
            await refreshAccessToken(); // Await the refresh
            config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`; // Set the new token
          } else {
            // If the token is valid, set it in the Authorization header
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
        } else {
          // Access token is expired
          if (refreshTokenExpiryTime > 0) {
            // Refresh token is valid, attempt to refresh the access token
            await refreshAccessToken();
            config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`; // Update with new token
          } else {
            console.warn("Access token & Refresh token expired. Redirecting to login...");
            // Redirect to login if both tokens are expired
            // window.location.href = "/login";
          }
        
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Handle token decoding errors as necessary
      }
    }

    return config; // Return the modified config
  },
  (error) => Promise.reject(error)
);


// Interceptor for handling expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      // Try to refresh the token
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return api(error.config);
      } else {
        // Redirect to login if refresh token is invalid
        window.location.href = "/login";
      }
    }
    if (error.response.status === 401) {
      return null;
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/auth/refresh",
      {
        token: refreshToken,
      }
    );
    const { accessToken } = response.data;

    // Save the new access token
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Unable to refresh access token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

export const loginUser = async (identifier, password) => {
  // Check if identifier and password are provided
  if (!identifier || !password) {
    console.error("Identifier and password are required");
    return { message: "Identifier and password are required" };
  }
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/login",
      {
        identifier,
        password,
      }
    );

    const { userId, accessToken, refreshToken } = response.data;

    return { message: "Success", userId, accessToken, refreshToken };
  } catch (error) {
    console.error(
      "Error logging in:",
      error.response?.data || error.message
    );

    return { message: error.response?.data?.error || "Login failed" };
  }
};

export const registerUser = async (userName, password, email) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/register",
      {
        userName,
        password,
        email,
      }
    );
    return response.data.message; // Return the data directly
  } catch (error) {
    console.error("Error registering:", error.response.data.message);

    return error.response.data.message; // Handle error by returning null or an empty array
  }
};

export const addNotes = async (userId, groupId, notes) => {
  console.log("im here");
  try {
    await api.put(`/notes/${userId}/${groupId}`, { notes });
  } catch (error) {
    console.error("Error adding notes:", error);
    throw error;
  }
};

export const deleteNotes = async (groupId) => {
  try {
    // Ensure the groupId and userId are present
    if (!groupId) {
      return { status: 400, message: "Group ID is required" };
    }

    const userId = localStorage.getItem("userId");

    // Check if userId is available
    if (!userId) {
      return { status: 400, message: "User ID is not found in localStorage" };
    }

    // Make the DELETE request
    const response = await api.delete(`/notes/${userId}/${groupId}`);

    // Check for successful response
    if (response.status === 200) {
      return { status: 200, message: "Note deleted successfully" };
    } else {
      // Handle non-200 status codes
      return { status: response.status, message: response.data.message || "Error deleting note" };
    }
  } catch (error) {
    console.error("Error deleting notes:", error);
    // Handle error with a fallback message
    return { status: 500, message: "Error deleting note" };
  }
};


export const createNotesGroup = async (
  userId,
  groupName,
  groupColor,
  shortForm
) => {
  try {
    const response = await api.post("/notes", {
      userId,
      groupName,
      groupColor,
      shortForm,
      notes: [],
    });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const getNotes = async (userId, groupId) => {
  try {
    const response = await api.get(`/notes/${userId}/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting notes:", error);
    return null;
  }
};

export const getGroups = async (userId) => {
  try {
    const response = await api.get(`/groups/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting groups:", error);
    return null;
  }
};
