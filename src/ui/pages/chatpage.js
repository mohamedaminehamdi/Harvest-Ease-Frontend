import React,{ useState } from "react";
import MessagesLayout from "../components/chatbot/MessagesLayout";
import ChatbotInput from "../components/chatbot/ChatbotInput";
function ChatPage() {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [chatData, setChatData] = useState([])

  let messageIdCounter = 0;

  function generateMessageId() {
      messageIdCounter++;
      return messageIdCounter;
  }

  const getResponse = async () => {
      if (!value) {
        setError("Error! Please ask a question")
      }

      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({
            history: chatHistory,
            userInput: value
          }),
          headers: {
            'Content-type': 'application/json'
          }

        }

        const response = await fetch('http://localhost:3000/Chatbot', options)
        const data = await response.text()
        setChatHistory([...chatHistory, {
          role: "user",
          parts: [{text: value}]
        },
        {
          role: "model",
          parts: [{text: data}]
        }
      ])

      setChatData([...chatData,
        {
          id: generateMessageId(),
          sender: "user",
          content: value
        },
        {
          id: generateMessageId(),
          sender: "Chatbot",
          content: data
        }
      ])
      
      setValue("")
      } catch (error){

      }
  }
    console.log("Chat History:");
     chatHistory.forEach((message, index) => {
    console.log(`Message ${index + 1}:`, message);
  });
  return (
    <>
      <MessagesLayout chatData={ chatData }/>
      <ChatbotInput 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={getResponse}
        error={error} 
        className="fixed bottom-3 "
      />
    </>
  )
}

export default ChatPage;