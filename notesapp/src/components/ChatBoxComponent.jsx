import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
import NotesWidget from "./NotesWidget";
import { useEffect, useState, useContext } from "react";
import { getShortForm } from "./GroupListComponent";
import { Context } from "../pages/mainpage";


const ChatBox = () => {
  const {
    selectedGroup,
    selectedColor,

  } = useContext(Context);
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes
      ? JSON.parse(storedNotes)
      : [
          {
            id: 1,
            description: "This is a test note",
            date: "2023-08-01",
            time: "10:00 AM",
            groupname: "test group",
          },
        ];
  });

  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isNoteSubmitted, setIsNoteSubmitted] = useState(false);

  useEffect(() => {
    console.log("im in inside useEffect Chatbox");

    const notes = JSON.parse(localStorage.getItem("notes"));
    console.log("currentNotes: ", notes);

    const notesFiltered = notes.filter((notes) => {
      return notes.groupname === selectedGroup;
    });
    setFilteredNotes(notesFiltered);
    setIsNoteSubmitted(false);
  }, [isNoteSubmitted, selectedGroup]);

  return (
    <div className={styles.container}>
      <header>
        <div style = {{backgroundColor: selectedColor}} className={styles.shortForm}>
          {getShortForm(selectedGroup)}
        </div>
        <p>{selectedGroup}</p>
      </header>
      <div className={styles.notesDisplay}>
        {console.log("filteredNotes", filteredNotes)}
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
          selectedGroup={selectedGroup}
          setIsNoteSubmitted={setIsNoteSubmitted}
        />
      </div>
    </div>
  );
};


export default ChatBox;
