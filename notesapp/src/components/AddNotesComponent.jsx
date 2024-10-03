import { useState } from "react";
import styles from "./styles/AddNotesComponent.module.css";

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
]; // Add more colors if needed

const AddNotes = ({setGroupColor, setGroupName, setShowAddNotes }) => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedColor, setSelectedColor] = useState('');


  const handleCreateGroup = () => {
    setShowAddNotes(false);
    setGroupName(selectedGroup);
    setGroupColor(selectedColor);

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
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};
export default AddNotes;
