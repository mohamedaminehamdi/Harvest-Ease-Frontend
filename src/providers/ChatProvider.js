import React, { useState, useEffect, createContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chatData, setChatData] = useState(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    return storedMessages;
  });

  const deleteMessage = (messageId) => {
    setChatData(chatData.filter((message) => message.id !== messageId));
    console.log('Message deleted:', messageId);
  };

  const saveMessage = (message) => {
    const messageExists = chatData.some((msg) => msg.id === message.id);
    if (!messageExists) {
      setChatData([...chatData, message]);
    }
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

export default ChatProvider;
export { ChatContext };
