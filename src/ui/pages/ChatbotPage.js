import React from "react";
import MessagesLayout from "../components/chatbot/MessageLayout";
import ChatbotInput from "../components/chatbot/ChatbotInput";
function ChatPage() {
  return (
    < >
      <MessagesLayout/>
      <ChatbotInput className="fixed bottom-3 " />
    </>
  )
}

export default ChatPage;