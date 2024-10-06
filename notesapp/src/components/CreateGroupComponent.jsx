import { useState } from "react";
import styles from "./styles/CreateGroupComponent.module.css";
import PropTypes from "prop-types";

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
]; // Add more colors if needed

const CreateGroup = ({

  setShowAddNotes,
  setCreatedNewGroup,
  setCurrentGroupName,
}) => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [createGroupButtonClicked, setCreateGroupButtonClicked] =
    useState(false);

  const handleCreateGroup = () => {
    const newGroup = {
      groupName: selectedGroup,
      groupColor: selectedColor,
      shortForm: selectedGroup.substring(0, 3).toUpperCase(), // assuming shortForm is the first 3 letters of groupName
    };

    const existingGroups = localStorage.getItem("groupData");
    if (existingGroups) {
      const groups = JSON.parse(existingGroups);
      groups.push(newGroup);
      localStorage.setItem("groupData", JSON.stringify(groups));
    } else {
      localStorage.setItem("groupData", JSON.stringify([newGroup]));
    }

    setCreateGroupButtonClicked(true);
    if (selectedGroup && selectedColor) {
      setShowAddNotes(false);
      setCreatedNewGroup(true);
      setCurrentGroupName(selectedGroup);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        placeholder="Enter group name"
      />
      <div>
        {colors.map((color, index) => (
          <button
            className={styles.colorButton}
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          >
            {selectedColor === color ? "Selected" : ""}
          </button>
        ))}
      </div>
      {selectedColor === "" &&
        selectedGroup === "" &&
        createGroupButtonClicked && (
          <p style={{ color: "red" }}>
            Please select a color and enter a group name
          </p>
        )}
      {selectedColor === "" &&
        selectedGroup !== "" &&
        createGroupButtonClicked && (
          <p style={{ color: "red" }}>Please select a color</p>
        )}
      {selectedGroup === "" &&
        selectedColor !== "" &&
        createGroupButtonClicked && (
          <p style={{ color: "red" }}>Please enter a group name</p>
        )}
      <button onClick={handleCreateGroup}>Create Group</button>
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