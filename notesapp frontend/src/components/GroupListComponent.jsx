import { useEffect } from "react";
import NotesGroupButton from "./NotesGroupButton";
import styles from "./styles/GroupListComponent.module.css";
import { useUserContext } from "../Contexts/UserContext";
import { useNotesContext } from "../Contexts/NotesContext";
import { getGroups } from "../api/notesAPI";
import { jwtDecode } from "jwt-decode";
const GroupList = () => {
  const { groups, setGroups, setShowAddNotes } = useNotesContext();
  const {
    setIsAuthenticated,
    setIsLoginMode,
    isAuthenticated,
    setUserId,
    userId,
  } = useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve accessToken from localStorage
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        let id = localStorage.getItem("userId");
        if (id) {
          if (id !== userId) {
            setUserId(id);
          }
        }
        if (!id && (accessToken || refreshToken)) {
          // Decode the access token to get userId
          let decodedToken = "";
          if (accessToken) {
            decodedToken = jwtDecode(accessToken);
          } else {
            decodedToken = jwtDecode(refreshToken);
          }

          const id = decodedToken.id; // Adjust this if your userId is stored under a different key

          localStorage.setItem("userId", id);
        }

        id = localStorage.getItem("userId", id);
        if (id !== userId) {
          setUserId(id);
        }
        // Fetch groups using the extracted userId

        const groupsStored = await getGroups(id);
        if (!groupsStored) {
          setIsAuthenticated(false);
          setIsLoginMode(true);
        } else {
          if (
            JSON.stringify(groupsStored) !== JSON.stringify(groups)
          ) {
            console.log("im here");
            setGroups(groupsStored);
            setIsAuthenticated(true);
            setIsLoginMode(false);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors (e.g., token may be invalid or expired)
        setIsAuthenticated(false);
        setIsLoginMode(true);
      }
    };

    fetchUserData();
  }, [isAuthenticated, userId, groups]);

  const createNewGroupButton = () => {
    setShowAddNotes(true);
  };

  return (
   
      <div className={styles.container} id="group-list-container">
        <div className={`col-lg-4 col-md-5 col-xl-3 ${styles.title}`}> 
          <h1 className = {styles.heading}>Pocket Notes</h1>         
        </div>
        {groups && (
          <div className={styles.notesFetchContainer}>
            {groups.map((group) => (
              <NotesGroupButton
                key={group.groupId}
                groupId={group.groupId}
                groupName={group.groupName}
                groupColor={group.groupColor}
                shortForm={getShortForm(group.groupName)}
              />
            ))}
          </div>
        )}
         <button
            className={ styles.addNotesGroup}
            style={{ width: "50px", height: "50px" }}
            onClick={createNewGroupButton}
          >
            +
          </button>
      </div>

  );
};

function getShortForm(groupName) {
  if (groupName) {
    const capitalizedName = groupName.toUpperCase();
    const words = capitalizedName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0);
    } else if (words.length === 2) {
      return words[0].charAt(0) + words[1].charAt(0);
    } else {
      return words[0].charAt(0) + words[1].charAt(0);
    }
  }
}

export default GroupList;
export { getShortForm };
