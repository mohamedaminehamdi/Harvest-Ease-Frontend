import React from 'react'
import { mockChatbotMessages } from './MockChatBotMessages'
import MessageLayout from './MessageLayout'

function MessagesLayout() {
  return (
    <ul className='flex flex-col p-7 h-full overflow-auto mt-5'>
        {
            mockChatbotMessages.map(
                (val, key)=>{
                    return(
                         <MessageLayout messageContent={val.message} sender={val.sender} key={val.id}/>
                        
                    )
                }
            )
        }
    </ul>
  )
}

export default MessagesLayout