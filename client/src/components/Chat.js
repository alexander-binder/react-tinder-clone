import { useState, useEffect } from "react";
import axios from 'axios';


const Chat = ({user, clickedUser, descendingOrderMessages}) => {

  
    //  console.log(userMessages);
    return (
        <>
            <div className="chat-display">
              {descendingOrderMessages.map((message, index) => (
                <div key={index}>
                    <div className="chat-message-header">
                        <div className="img-container">
                            <img src={message.img} alt="" />
                        </div>
                        <p className="chat-message-user-name" >{message.name}</p>  
                    </div>
                    <p>{message.message}</p>
                </div>
              ))}
            </div>
        </>
    )
}

export default Chat