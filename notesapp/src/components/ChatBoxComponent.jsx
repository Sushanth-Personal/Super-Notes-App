import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
const ChatBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className = {styles.notesDisplay}>Notes</div>
      <div className={styles.TextInputComponent}>
        <TextInputComponent />
      </div>
    </div>
  );
};

export default ChatBox;
