import React, { useState, useEffect, createContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [savedChatData, setSavedChatData] = useState(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    return storedMessages;
  });

  const deleteMessage = (messageId) => {
    setSavedChatData(savedChatData.filter((message) => message.id !== messageId));
    console.log('Message deleted:', messageId);
  };

  const saveMessage = (message) => {
    const messageExists = savedChatData.some((msg) => msg.id === message.id);
    if (!messageExists) {
      setSavedChatData([...savedChatData, message]);
    }
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(savedChatData));
  }, [savedChatData]);

  return (
    <ChatContext.Provider value={{ savedChatData, saveMessage, deleteMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
export { ChatContext };
