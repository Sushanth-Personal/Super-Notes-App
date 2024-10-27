import { useState, useContext } from "react";
import styles from "./styles/CreateGroupComponent.module.css";
import PropTypes from "prop-types";
import { Context } from "../pages/mainpage";
import { getShortForm } from "./GroupListComponent";
import { createNotesGroup, addNotes } from "../api/notesAPI.js";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
]; // Add more colors if needed

const CreateGroup = ({ setShowAddNotes, setCreatedNewGroup }) => {
  const {  setSelectedGroup, setSelectedColor ,setRefreshPage,setNotes} =
    useContext(Context);
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

    setErrorMessage("");

    try {
      const newGroup = {
        groupName: groupName.trim(),
        groupColor,
        shortForm: getShortForm(groupName.trim()),
      };
      const createdGroup = await createNotesGroup(
        newGroup.groupName,
        newGroup.groupColor,
        newGroup.shortForm
      );
      console.log("This is the group created ",createdGroup)
      setSelectedGroup(createdGroup.groupName);
      setSelectedColor(createdGroup.groupColor);
      setRefreshPage(true);
      setShowAddNotes(false);
      setCreatedNewGroup(true);
      setNotes([]);
     
      
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

CreateGroup.propTypes = {
  setGroupColor: PropTypes.func.isRequired,
  setGroupName: PropTypes.func.isRequired,
  setShowAddNotes: PropTypes.func.isRequired,
  setCreatedNewGroup: PropTypes.func.isRequired,
};

export default CreateGroup;
