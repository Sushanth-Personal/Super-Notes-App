import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState, useEffect } from "react";

const TextInputComponent = ({
  setNotes,
  currentGroupName,
  setSendNotesButtonClicked,
}) => {
  const [date, setDate] = useState([]);
  const [description, setDescription] = useState("");
 
  const handleClick = () => {
    addCurrentNote();
    setSendNotesButtonClicked(true);
    setDescription("");
  };

  const addCurrentNote = () => {

    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setDate(formatDateAndTime(Date.now()));

    const notes = {
      id: existingNotes.length+1,
      date: formatDateAndTime(Date.now(), "date"),
      time: formatDateAndTime(Date.now(), "time"), // assuming you have a time format option
      description: description,
      groupname: currentGroupName, // replace with actual group name
    };
    
    const updatedNotes = [...existingNotes, notes];
  setNotes(updatedNotes);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleChange = (e) => {
    setDescription(e.target.value); // update description state on text change
  };

  return (
    <div className={styles.container}>
      <textarea className={styles.textArea} onChange={handleChange} 
      value={description}
      />
      <button
        className={styles.textEnterButton}
        onClick={handleClick}
      >
        <img src="./TextEnterButton.png" />
      </button>
    </div>
  );
};

export default TextInputComponent;
