import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'
import MatchesDisplay from './MatchesDisplay';

const ChatContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)
    console.log(clickedUser);
    return (
        <>
        <div className="chat-container">
            <ChatHeader user={ user }/>

            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>
            
            { !clickedUser && <MatchesDisplay userConnectedId={ user.user_id } matches={user?.matches} setClickedUser={setClickedUser}/> }

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
        </div>

        </>
    )
}

export default ChatContainer