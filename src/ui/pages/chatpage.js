import React from 'react'
import ChatbotInput from '../components/chatbot/ChatbotInput'
import MessagesLayout from '../components/chatbot/MessagesLayout'
import ChatbotPageNavBar from '../components/chatbot/ChatbotPageNavbar'
import ChatProvider from '../../providers/ChatProvider'

function ChatBotPage() {
  return (
    <ChatProvider>
    <div className="h-screen flex-col flex justify-end p-6">
      {/* <ChatbotPageNavBar className='mb-2'/>
      <MessagesLayout className=''/>
      <ChatbotInput className="fixed bottom-3 "/> */}
    </div>
    </ChatProvider>
  )
}

export default ChatBotPage