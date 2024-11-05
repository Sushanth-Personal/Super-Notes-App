
import { createContext, useState , useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("");

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        isLoginMode,
        setIsLoginMode,
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
export const useUserContext = () => {
    return useContext(UserContext); // This is where we use useContext with UserContext
};
// PropTypes validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export default UserContext