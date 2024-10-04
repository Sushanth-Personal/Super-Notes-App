import styles from "./styles/TextInputComponent.module.css";
const TextInputComponent = () => {
  return (
    <div className = {styles.container} >
      <textarea className = {styles.textArea} />
      <button className = {styles.textEnterButton}>
        <img src='./TextEnterButton.png' />
        </button>
    </div>
  )
}

export default TextInputComponent;