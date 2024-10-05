import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
import NotesWidget from "./NotesWidget";
import { useEffect, useState } from "react";
const ChatBox = ({ currentGroupName }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      description: "This is a test note",
      date: "2023-08-01",
      time: "10:00 AM",
      groupname: "test group",
    },
  ]);

  useEffect(
    ()=>{
      console.log(notes)
      localStorage.setItem("notes", JSON.stringify(notes));
    },
  [notes]);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [sendNotesButtonClicked, setSendNotesButtonClicked] = useState(false);
  

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const filteredNotes = notes
      ? notes.filter((note) => note.groupname === currentGroupName)
      : [];
    setFilteredNotes(filteredNotes);
    console.log(currentGroupName);
  },[currentGroupName]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles.notesDisplay}>
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NotesWidget
              note={note.description}
              date={note.date}
              time={note.time}
            />
          </div>
        ))}
      </div>
      <div className={styles.TextInputComponent}>
        <TextInputComponent 
        setNotes={setNotes}
        currentGroupName={currentGroupName}
        setSendNotesButtonClicked={setSendNotesButtonClicked}
        />
      </div>
    </div>
  );
};

export default ChatBox;
