import { useState } from "react";
import styles from "./styles/CreateGroupModal.module.css";
import PropTypes from "prop-types";
import { useNotesContext } from "../Contexts/NotesContext.jsx";
import { useUserContext } from "../Contexts/UserContext";
import { getShortForm } from "./GroupListComponent.jsx";
import { createNotesGroup } from "../api/notesAPI.js";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
]; // Add more colors if needed

const CreateGroupModal = () => {
  const { userId, setUserData, userData } = useUserContext();

  const {
    setSelectedGroup,
    setSelectedColor,
    setNotes,
    setGroupId,
    setShowAddNotes,
  } = useNotesContext();

  const [createGroupButtonClicked, setCreateGroupButtonClicked] =
    useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateGroup = async () => {
    setCreateGroupButtonClicked(true);
    if (!groupName.trim() || !groupColor) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (
      userData.groups.some(
        (group) =>
          group.groupName.toLowerCase() ===
          groupName.trim().toLowerCase()
      )
    ) {
      setErrorMessage("Group name already exists.");
      return;
    }
    setErrorMessage("");

    try {
      const newGroup = {
        userId: userId,
        groupName: groupName.trim(),
        groupColor,
        shortForm: getShortForm(groupName.trim()),
        notes: [],
      };
      const userData = await createNotesGroup(
        newGroup.userId,
        newGroup.groupName,
        newGroup.groupColor,
        newGroup.shortForm
      );
      setUserData(userData);
      setNotes([]);
      setShowAddNotes(false);
      setGroupId(userData.groups.length);
      console.log("userData", userData);
      setSelectedGroup(
        userData.groups[userData.groups.length - 1].groupName
      );
      setSelectedColor(
        userData.groups[userData.groups.length - 1].groupColor
      );
    } catch (error) {
      setErrorMessage("Error creating group: ", error);
    } finally {
      console.log("Popup unmounted");
    }
  };


  return (
    <div
      className={styles.container}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCreateGroup();
        }
      }}
    >
      <h1>Create New Group</h1>
      <div>
        <label htmlFor="groupName">Group Name</label>
        <input
          autoFocus
          name="groupName"
          type="text"
          value={groupName}
          onChange={(e) => {
            if (e.target.value.length <= 55) {
              setGroupName(e.target.value);
            }
          }}
          onFocus={() => setErrorMessage("")}
          placeholder="Enter group name"
          className={styles.groupNameInput}
        />
      </div>

      <div className={styles.colorPaletteSection}>
        <label className={styles.colorPalleteLabel} htmlFor="color">
          Choose Color
        </label>
        <div className={styles.colorPalette}>
          {colors.map((color, index) => (
            <button
              className={
                groupColor === color
                  ? `${styles.colorButton} ${styles.selectedColorButton}`
                  : styles.colorButton
              }
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => setGroupColor(color)}
            ></button>
          ))}
        </div>
      </div>
      <div className={styles.bottomSection}>
        {groupColor === "" &&
          groupName.trim() === "" &&
          createGroupButtonClicked && (
            <p
              className={styles.errorMessage}
              style={{ color: "red" }}
            >
              Please select a color and enter a group name
            </p>
          )}
        {groupColor === "" &&
          groupName.trim() !== "" &&
          createGroupButtonClicked && (
            <p
              className={styles.errorMessage}
              style={{ color: "red" }}
            >
              Please select a color
            </p>
          )}
        {groupName.trim() === "" &&
          groupColor !== "" &&
          createGroupButtonClicked && (
            <p
              className={styles.errorMessage}
              style={{ color: "red" }}
            >
              Please enter a group name
            </p>
          )}
        {groupName.trim() !== "" &&
          groupColor !== "" &&
          createGroupButtonClicked &&
          errorMessage && (
            <p
              className={styles.errorMessage}
              style={{ color: "red" }}
            >
              {errorMessage}
            </p>
          )}
        <button
          className={styles.createGroupButton}
          onClick={handleCreateGroup}
        >
          Create
        </button>
      </div>
    </div>
  );
};

CreateGroupModal.propTypes = {
  setShowAddNotes: PropTypes.func.isRequired,
};

export default CreateGroupModal;
