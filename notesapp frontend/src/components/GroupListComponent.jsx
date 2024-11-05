import { useState, useEffect } from "react";
import NotesGroupButton from "./NotesGroupButton";
import styles from "./styles/GroupListComponent.module.css";
import { useUserContext } from "../Contexts/UserContext";
import { getGroups } from "../api/notesAPI";
const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const { setIsAuthenticated, setIsLoginMode, isAuthenticated,setUserId } =
    useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        setUserId(userId);
        if (userId) {
          const groups = await getGroups(userId);
          if (!groups) {
            setIsAuthenticated(false);
            setIsLoginMode(true);
          } else {
            console.log("grooups", groups);
            setGroups(groups);
            setIsAuthenticated(true);
          }
        } else setIsAuthenticated(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  return (
    <div className={styles.container} id="group-list-container">
      <header className={styles.title}>
        <h1 className={styles.heading}>Pocket Notes</h1>
      </header>

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
