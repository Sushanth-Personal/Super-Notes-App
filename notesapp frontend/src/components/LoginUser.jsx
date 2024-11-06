import { useState } from "react";
import { useUserContext } from "../Contexts/UserContext";
import styles from "./styles/LoginUser.module.css"; 
import { loginUser } from "../api/notesAPI.js"; // Create a new function for login


const LoginUser = () => {
  const [identifier, setIdentifier] = useState(""); // Can be username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoginMode, setUserData, setIsAuthenticated, setUserId, isLoginMode, setIsRegisterMode } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(identifier, password);
      if(response) {
        if(response.userId) localStorage.setItem("userId", response.userId);
        if(response.accessToken) localStorage.setItem("accessToken", response.accessToken);
        if(response.refreshToken) localStorage.setItem("refreshToken", response.refreshToken);
        setError("");
      }

      if(response.message === "Success") {
        setIsLoginMode(false);
        setUserData(response.user);
        setIsAuthenticated(true);
        setUserId(response.userId);
      }

    } catch (error) {
      setError("Login failed: " + error.response.data.error);
      console.error("Error:", error);
    }
  };

  return (
    <>
    {isLoginMode && (
      <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.window}`}>
        <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h1 className="text-center mb-4">Login</h1>
          {error && <p className="alert alert-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="identifier" className="form-label">Username/Email:</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <p>Not signed in?</p>
            <button className="btn btn-link" onClick={() => {
              setIsLoginMode(false); 
              setIsRegisterMode(true);
            }}>Sign Up</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default LoginUser;
