import Chat from './Chat'
import ChatInput from './ChatInput'
// import axios from 'axios'
import {useState, useEffect} from "react"


const ChatDisplay = ({user, clickedUser}) => {
   
    return (
        <>
        <Chat user={user} clickedUser={clickedUser}/>
        <ChatInput />
        
        </>
    )
}

export default ChatDisplay