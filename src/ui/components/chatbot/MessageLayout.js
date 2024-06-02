import { PlusIcon, SparklesIcon } from '@heroicons/react/24/solid'
import ProfilePictureHolder from './ProfilePictureHolder'
import React, { useState, useContext } from 'react';
import Popup from './Popup';
import { ChatContext } from '../../../providers/ChatProvider';

function MessageLayout({message}) {
  const [isOpen, setIsOpen] = useState(false);
  const { saveMessage } = useContext(ChatContext);
  

  


  const handleNewMessage = () => {
    saveMessage(message);
  };


  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };
  return (
    <li key={message.id} className={` mb-5 text-wrap flex-col contain-content`}>
        <div className='flex-row flex'>
            {
                message.sender==='Chatbot'?
                  <SparklesIcon className='size-6 ml-1 text-green-500'/>
                  : <ProfilePictureHolder size={'size-7'} className='ml-2'/>
            }
             <h3 className='font-bold mb-2 flex-1 ml-2'>{message.sender}</h3>
        </div>
        <div className={`relative w-full h-fit py-7 pl-8 pr-2 rounded-3xl ${message.sender==='Chatbot' && 'bg-darkerGreen'}`}>
          {
            message.sender==='Chatbot'&& <button onClick={handleNewMessage} onMouseEnter={handleOpenPopup} onMouseLeave={handleClosePopup} className='rounded-full size-6 bg-pastelGreen right-3 top-4 absolute'>
            <PlusIcon onClick={handleOpenPopup} className='size-4 m-auto'/> 
          </button>
          }
          
            {
              isOpen && <Popup content={'save'}/>
            }
          
          
          
          {
            message.content
          }
        </div>
      
    </li>
  )
}

export default MessageLayout