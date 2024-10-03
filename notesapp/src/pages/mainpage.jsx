import styles from '../styles/mainpage.module.css'
import AddNotes from '../components/addNotes'
import ChatBox from '../components/ChatBox'
const mainpage = () => {
  return (
    <div className = {styles.container}>
        <div className = {styles.groupList}>
            <div className = {styles.addNotes}>
                <AddNotes/>
            </div>
        </div>
        <div className = {styles.chatBox}>
            <ChatBox/>
        </div>
        </div>
  )
}

export default mainpage;