import { useState, useEffect } from "react";
import styles from "./styles/RegisterUser.module.css";
import { registerUser } from "../api/notesAPI.js";
import { useUserContext } from "../Contexts/UserContext";
const RegisterUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setIsLoginMode,
    isRegisterMode,
    setIsRegisterMode,
    error,
    setError,
  } = useUserContext();

  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await registerUser(userName, password, email);
      console.log(response);
      if (response === "Success") {
        setIsRegisterMode(false);
        setIsLoginMode(true);
      }
      if (response === "Username already exists") {
        console.log(typeof response);
        setError("Username already exists");
      }
      if (response === "Email already exists") {
        setError("Email already exists");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div
      className={`d-flex align-items-center justify-content-center vw-100 vh-100 ${styles.window}`}
    >
      {console.log("Register user is rendering", error)}
      <div className={`col-md-6 col-lg-4 col-xl-3 col-sm-8 col-10`}>
        <div className={`card p-4`} id="register-form">
          {isRegisterMode && (
            <>
              <h1 className={`text-center mb-4`}>Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className={`mb-3`}>
                  <label className={`form-label`} htmlFor="userName">
                    User Name{" "}
                  </label>
                  <input
                    className={`form-control`}
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  {error && error === "Username already exists" && (
                    <div className="text-danger" role="alert">
                      * Username already exists 
                    </div>
                  )}
                </div>
                <div className={`mb-3`}>
                  <label className={`form-label`} htmlFor="email">
                    Email:{" "}
                  </label>
                  <input
                    className={`form-control`}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                   {error && error === "Email already exists" && (
                    <div className="text-danger" role="alert">
                      * Email already exists 
                    </div>
                  )}
                </div>
                <div className={`mb-3`}>
                  <label className={`form-label`} htmlFor="password">
                    Password:{" "}
                  </label>
                  <input
                    className={`form-control`}
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  className={`btn btn-primary w-100 mb-3`}
                  type="submit"
                >
                  Register
                </button>
              </form>
              <div>
                <h2 className={`text-center fs-6 mb-3`}>
                  Alread signed in ?{" "}
                </h2>
                <button
                  className={`btn btn-link w-100`}
                  onClick={() => {
                    setIsLoginMode(true);
                    setIsRegisterMode(false);
                  }}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
