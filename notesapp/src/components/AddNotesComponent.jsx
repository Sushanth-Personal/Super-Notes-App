import { useState } from "react";
import styles from "./styles/AddNotesComponent.module.css";
const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
]; // add more colors as needed

const AddNotes = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreateGroup = () => {
    // create a new group with the given name and color
    // this will likely involve making an API call or updating a database
    console.log(
      `Creating group: ${groupName} with color: ${selectedColor}`
    );
  };
  const handleColorPicked = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className = {styles.container}>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <div>
        {colors.map((color) => (
          <button className = {styles.colorButton}
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => {
              handleColorPicked(color);
            }}
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
