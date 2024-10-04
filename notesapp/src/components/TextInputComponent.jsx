import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState, useEffect } from "react";
const TextInputComponent = () => {
const [date, setDate] = useState([]);

    const handleClick = () => {
        console.log("clicked");
        setDate(formatDateAndTime(Date.now()));
        
    }

    useEffect(() => {
       console.log(date);
    }, [date]);

  return (
    <div className = {styles.container} >
      <textarea className = {styles.textArea} />
      <button className = {styles.textEnterButton}
      onClick={handleClick}
      >
        <img src='./TextEnterButton.png' />
        </button>
    </div>
  )
}

export default TextInputComponent;