import { useUserContext } from "../Contexts/UserContext";
import { useNotesContext } from "../Contexts/NotesContext";
import styles from "./styles/mainpage.module.css";
import CreateGroupModal from "../components/CreateGroupModal";
import ChatBox from "../components/ChatBoxComponent";
import GroupList from "../components/GroupListComponent";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";

/**
 * The main page component for the NotesApp.
 * Handles conditional rendering of the Login/Register component,
 * GroupList component, ChatBox component, and CreateGroupModal component.
 * Also handles the overlay and add notes button click events.
 */
const MainPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // Extract the authentication context for conditional rendering
  const { isLoginMode, isRegisterMode } = useUserContext();
  const { showAddNotes, setShowAddNotes, selectedGroup } =
    useNotesContext();
 

  const handleOverlayClick = () => {
    setShowAddNotes(false);
  };

  return (
    <div className={styles.container}>
      {/* Wrap LoginUser and RegisterUser with UserProvider */}

      {/* (isLoginMode ? <LoginUser /> : <RegisterUser />) */}
      {isLoginMode && <LoginUser />}
      {isRegisterMode && <RegisterUser />}
      {/* Other components that do not need access to UserProvider */}
      {!selectedGroup && isMobile && (
        <>
          <GroupList />
         
        </>
      )}
      {!isMobile && (
        <div className={`col-lg-4 col-md-5 col-xl-3`}>
          <GroupList />
        </div>
      )}

      <ChatBox />

      {showAddNotes && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div
            className={styles.addNotesComponent}
            onClick={(e) => e.stopPropagation()} // Stop click propagation
          >
            <CreateGroupModal />
          </div>
        </div>
      )}
    </div>
  );
};

MainPage.propTypes = {
  // No props are expected for this component
};

CreateGroupModal.propTypes = {
  setShowAddNotes: PropTypes.func.isRequired,
};

export default MainPage;
