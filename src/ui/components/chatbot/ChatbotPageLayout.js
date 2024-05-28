import React from 'react'
import ChatbotPageNavBar from './ChatbotPageNavbar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import ChatProvider from '../../../providers/ChatProvider';

function ChatbotPageLayout() {
  const [activeTab, setActiveTab] = useState('Chat'); 

  return (
    // <div className="h-screen flex-col flex justify-end relative w-full">
    //     <ChatbotPageNavBar activeTab={activeTab} setActiveTab={setActiveTab} className='flex flex-row w-1/3 h-1/5 absolute top-2 mt-1 mb-4 '/>
    //     <Outlet/>
    // </div>

      <ChatProvider>
        <div className="flex flex-col w-full h-screen">
            <ChatbotPageNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* <div className=" flex-col flex flex-shrink px-6 pt-2 bg-yellow-300 max-h-72">
            </div> */}
              <Outlet/>
        </div>
      </ChatProvider>
  ) 
}

export default ChatbotPageLayout