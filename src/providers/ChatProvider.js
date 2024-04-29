import React, { useState, useEffect } from 'react'

const ChatContext = React.createContext();

let ChatProvider = ({ children }) => {
    const [chatData, setChatData] = useState(
            () => {
                const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        return storedMessages;
            }
    );
    
    const deleteMessage = (messageId) => {
        setChatData(chatData.filter((message) => message.id !== messageId));
        console.log('hii')
      };
    
    const saveMessage = (message) => {
    const messageExists = chatData.some((msg) => msg.id === message.id);

    !messageExists && setChatData([...chatData, message]); 

        
      
      
    };


    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatData));
      }, [chatData]);
  
    return (
      <ChatContext.Provider value={{ chatData, saveMessage, deleteMessage }}>
        {children}
      </ChatContext.Provider>
    );
  };

  export default ChatProvider ;
  export { ChatContext }