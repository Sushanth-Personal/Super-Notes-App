import axios from "axios";
import {jwtDecode} from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
 
  (config) => {
    // Retrieve access token and refresh token from localStorage
   
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    // Check if the access token exists and is valid
    if (accessToken) {
      try {
        // Decode the token to check its expiration
        const decodedAccessToken = jwtDecode(accessToken);
        const decodedRefreshToken = jwtDecode(refreshToken);
        const isAccessTokenExpired = decodedAccessToken.exp * 1000 < Date.now(); // Compare with current time in milliseconds
        const isRefreshTokenExpired = decodedRefreshToken.exp * 1000 < Date.now();
        if (!isAccessTokenExpired) {
          // If the token is not expired, add it to the Authorization header
          console.log(`access token is valid for  ${(decodedAccessToken.exp * 1000 - Date.now())/3600000} hours`);
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        } else {
          if(!isRefreshTokenExpired) {
            console.log(`access token is valid for  ${(decodedRefreshToken.exp * 1000 - Date.now())/3600000} hours`);
            refreshAccessToken();
          }
          else console.warn("Access token & Refresh token is expired. Taking to login page....");

          // Optionally, you can handle the logic to refresh the token here
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Handle token decoding errors as necessary
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      console.log("errror 403");
      // Try to refresh the token
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(error.config);
      } else {
        // Redirect to login if refresh token is invalid
        window.location.href = "/login";
      }
    }
    if(error.response.status ===401){
      console.log("Login my boy")
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
    const response = await axios.post("http://localhost:5000/auth/refresh", {
      token: refreshToken,
    });
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
  console.log("sending login request", identifier, password);
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
      identifier,
      password,
    });

    const { user,accessToken, refreshToken } = response.data;
    console.log("login response", user, accessToken, refreshToken);
    return { message: "Success",user, accessToken, refreshToken };
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    
    // Return an error message from the server or a generic one
    return { message: error.response?.data?.error || "Login failed" };
  }
};


export const registerUser = async (userName, password, email) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/register", {
      userName,
      password,
      email,
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error registering:", error);
    return null; // Handle error by returning null or an empty array
  }
};

export const addNotes = async (userId, groupId, notes) => {
  console.log("im here")
  try {
    await api.put(`/notes/${userId}/${groupId}`, { notes });
  } catch (error) {
    console.error("Error adding notes:", error);
    throw error;
  }
};

export const deleteNotes = async (groupId) => {
  try {
    if (groupId) {
      await api.delete(`/notes/${groupId}`);
      console.log("Successfully deleted");
    } else {
      console.log("Group doesn't exist");
    }
  } catch (error) {
    console.error("Error deleting notes:", error);
    throw error;
  }
};

export const createNotesGroup = async (userId,groupName, groupColor, shortForm) => {
  try {

    const response = await api.post("/notes", { userId,groupName, groupColor, shortForm, notes: [] });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const getNotes = async (userId,groupId) => {
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

