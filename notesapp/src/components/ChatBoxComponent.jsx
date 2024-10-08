import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
import NotesWidget from "./NotesWidget";
import { useEffect, useState, useContext } from "react";
import { getShortForm } from "./GroupListComponent";
import { Context } from "../pages/mainpage";
import { useMediaQuery } from "react-responsive";

const ChatBox = () => {
  const { selectedGroup, selectedColor, setSelectedGroup } =
    useContext(Context);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isNoteSubmitted, setIsNoteSubmitted] = useState(false);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));

    const notesFiltered = notes.filter((note) => {
      return note.groupname === selectedGroup;
    });
    setFilteredNotes(notesFiltered);
    setIsNoteSubmitted(false);
  }, [isNoteSubmitted, selectedGroup]);

  return (
    <div className={styles.container}>
      {selectedGroup && !isMobile && (
        <header>
          <div
            style={{ backgroundColor: selectedColor }}
            className={styles.shortForm}
          >
            {getShortForm(selectedGroup)}
          </div>
          <p className={styles.groupName}>{selectedGroup}</p>
        </header>
      )}

      {selectedGroup && isMobile && (
        <header>
          <img
            className={styles.backButton}
            src="./backButton.png"
            alt="back"
            onClick={() => setSelectedGroup(null)}
          />
          <div
            style={{ backgroundColor: selectedColor }}
            className={styles.shortForm}
          >
            {getShortForm(selectedGroup)}
          </div>
          <p className={styles.groupName}>{selectedGroup}</p>
        </header>
      )}

      {!isMobile && (
        <>
          {!selectedGroup && (
            <div className={styles.mainContainer}>
              <main>
                <img src="./Mainpage.png" alt="image" />
                <h1>Pocket Notes</h1>
                <p>
                  Send and receive messages without keeping your phone
                  online. Use Pocket Notes on up to 4 linked devices and 1
                  mobile phone.
                </p>
              </main>
              <footer>
                <img src="./lock.png" alt="lock" />
                <p>end-to-end encrypted</p>
              </footer>
            </div>
          )}

          {selectedGroup && (
            <>
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
                  selectedGroup={selectedGroup}
                  setIsNoteSubmitted={setIsNoteSubmitted}
                />
              </div>
            </>
          )}
        </>
      )}

      {isMobile && selectedGroup && (
        <>
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
              selectedGroup={selectedGroup}
              setIsNoteSubmitted={setIsNoteSubmitted}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
