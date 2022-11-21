import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import {useState, useEffect} from "react"


const ChatDisplay = ({user, clickedUser}) => {
    
    const userConnectedId = user?.user_id;
    const oppositionUserId = clickedUser?.user_id;

    const [userConnectedMessages, setUserConnectedMessages] = useState(null);
    const [oppositionUserMessages, setOppositionUserMessages] = useState(null);

    const getUserConnectedMessages = async () => {
        try {
    
             const response = await axios.get('http://localhost:8000/messages',{ 
                 params: {userId: userConnectedId  && userConnectedId , correspondingUserId: oppositionUserId && oppositionUserId } 
             });
    
             setUserConnectedMessages(response.data);
         
        } catch (error) {
             console.log(error);
        }
     }

     const getUserOppositionMessages = async () => {
        try {
    
             const response = await axios.get('http://localhost:8000/messages',{ 
                 params: {userId: oppositionUserId && oppositionUserId, correspondingUserId: userConnectedId && userConnectedId } 
             });
    
             setOppositionUserMessages(response.data);
         
        } catch (error) {
             console.log(error);
        }
     }

     useEffect(() => {
        getUserConnectedMessages()
        getUserOppositionMessages()
     }, []);

    //  console.log('Liza:'+userConnectedMessages);
    //  console.log('Xavier:'+oppositionUserMessages);
    
    

        const messages = [];

        userConnectedMessages?.forEach(message => {
            const formattedmessage = {};
            formattedmessage['name'] = user?.first_name;
            formattedmessage['img'] = user?.url;
            formattedmessage['message'] = message.message;
            formattedmessage['timestamp'] = message.timestamp;
            messages.push(formattedmessage);
        });


        oppositionUserMessages?.forEach(message => {
            const formattedmessage = {};
            formattedmessage['name'] = clickedUser?.first_name;
            formattedmessage['img'] = clickedUser?.url;
            formattedmessage['message'] = message.message;
            formattedmessage['timestamp'] = message.timestamp;
            messages.push(formattedmessage);
        });


        // const descendingOrderMessages = messages?.sort((a,b) => a.timestamp - b.timestamp);
      
        const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp));
        console.log('formatted:'+ JSON.stringify(messages));

        // console.log('descendingOrderMessages:'+ JSON.stringify(descendingOrderMessages));


    return (
        <>
        <Chat user={user}  descendingOrderMessages={descendingOrderMessages} clickedUser={clickedUser}/>
        <ChatInput 
            getConnectedUserMessages={getUserConnectedMessages} 
            getOppositionUserMessages={getUserOppositionMessages}
            user={user}
            clickedUser={clickedUser}
        />
        
        </>
    )
}

export default ChatDisplay