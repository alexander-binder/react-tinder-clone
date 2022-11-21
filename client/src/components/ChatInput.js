import { useState} from 'react'
import axios from 'axios'

const ChatInput = ({user , clickedUser, getConnectedUserMessages, getOppositionUserMessages}) => {
    const [textArea, setTextArea] = useState("")
    const userConnectedId = user?.user_id;
    const oppositionUserId = clickedUser?.user_id;

    const addMessage = async () => {
        
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userConnectedId,
            to_userId: oppositionUserId,
            message: textArea
        }
        
        try {
    
            const response = await axios.post('http://localhost:8000/addmessage',{ message });
            getConnectedUserMessages();
            getOppositionUserMessages();
            setTextArea("");
            
       } catch (error) {
            console.log(error);
       }
    }

    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button" onClick={addMessage}>Submit</button>
        </div>
    )
}

export default ChatInput