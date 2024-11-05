import { useState} from "react";
import styles from "./styles/RegisterUser.module.css";
import { registerUser } from "../api/notesAPI.js";
import {useUserContext} from "../Contexts/UserContext";
const RegisterUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoginMode, isLoginMode } = useUserContext();

  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await registerUser(userName, password, email);
      console.log("User added:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container} id="login-form">
      {isLoginMode &&(
      <>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName"></label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div>
          <h2>Alread signed in ? </h2>
          <button onClick={() => setIsLoginMode(true)}>Login</button>
        </div>
      </>
      )}
    </div>
  );
};

export default RegisterUser;
