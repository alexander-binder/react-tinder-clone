import { useState, useEffect } from "react";
import axios from 'axios';


const Chat = ({user, clickedUser}) => {

    const [userMessages, setUserMessages] = useState(null);

    const getUserMessages = async () => {
        try {
    
             const response = await axios.get('http://localhost:8000/messages',{ 
                 params: {userId: user?.user_id, correspondingUserId: clickedUser?.user_id } 
             });
    
             setUserMessages(response.data);
         
        } catch (error) {
             console.log(error);
        }
     }

     useEffect(() => {
        getUserMessages();
     }, [userMessages]);

    //  console.log(userMessages);
    return (
        <>
            <div className="chat-display">
              
            </div>
        </>
    )
}

export default Chat