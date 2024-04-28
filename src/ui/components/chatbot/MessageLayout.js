import { SparklesIcon } from '@heroicons/react/24/solid'
import React from 'react'
import ProfilePictureHolder from './ProfilePictureHolder'

function MessageLayout({messageContent, sender, messageKey}) {
  return (
    <li key={messageKey} className={` mb-5 text-wrap flex-col contain-content`}>
        <div className='flex-row flex'>
            {
                sender==='Chatbot'?
                  <SparklesIcon className='size-6 ml-1 text-green-500'/>
                  : <ProfilePictureHolder size={'size-7'} className='ml-2'/>
            }
             <h3 className='font-bold mb-2 flex-1 ml-2'>{sender}</h3>
        </div>
        <div className={`w-full h-fit py-5 pl-8 pr-1 rounded-3xl ${sender==='Chatbot' && 'bg-darkerGreen'}`}>  {messageContent}</div>
      
    </li>
  )
}

export default MessageLayout