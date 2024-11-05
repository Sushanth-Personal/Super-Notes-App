import { useState } from "react";
import {useUserContext} from "../Contexts/UserContext";
import styles from "./styles/LoginUser.module.css"; 
import { loginUser } from "../api/notesAPI.js"; // Create a new function for login


const LoginUser = () => {
  const [identifier, setIdentifier] = useState(""); // Can be username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoginMode,setUserData,setIsAuthenticated,setUserId, isLoginMode} = useUserContext();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(identifier, password); // Call the login function
      if(response){
        console.log(response.accessToken)
        localStorage.setItem("userId", response.user._id);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      if(response.message === "Success"){
        console.log("Login successful Success message received");
        setIsLoginMode(false);
        setUserData(response.user);
        setIsAuthenticated(true);
        setUserId(response.user._id);

      }


    } catch (error) {
      setError("Login failed: " + error.response.data.error);
      console.error("Error:", error);
    }
  };

  return (
    <>
    {isLoginMode&&
    <div className = {styles.window}>
      <div className={styles.container} id="login-form">
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="identifier">Username/Email:</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <h2>Not signed in ? </h2>
        <button onClick={() => setIsLoginMode(false)}>Sign Up</button>
      </div>
      </div>
}
      </>
  );
};

export default LoginUser;
