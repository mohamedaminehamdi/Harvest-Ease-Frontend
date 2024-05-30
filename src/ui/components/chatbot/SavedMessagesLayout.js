import React, { useContext, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid';
import { ChatContext } from '../../../providers/ChatProvider';
import Popup from './Popup';
import DeleteMessagePopup from './DeleteMessagePopup';

function SavedMessagesLayout() {
    const [messagePopup, setMessagePopup] = useState([]);
    const [deleteMessagePopup, setDeleteMessagePopup] = useState(false);
    const  { savedChatData } =useContext(ChatContext)
    console.log('contexxxt')
    const handleOnClick = (messageId) => {
          setDeleteMessagePopup(true)
        
          console.log('im here')
    }
    const handleOpenPopup = (message) => {
        setMessagePopup({ ...messagePopup,[message.id]:true});
      };
    
      const handleClosePopup = (messageId) => {
        setMessagePopup({ ...messagePopup,[messageId]:false});
      };

    
  return (
    <ul className='flex flex-col p-7 h-full overflow-auto mt-5 relative w-full'>
        {
            savedChatData.map(
                (val,key)=> <li key={val.id} className='mb-10 flex flex-col'>
                    <div className='mx-auto mb-3'>
                        {val.timestamp}
                    </div>
                    <div className='bg-lightGreen w-full contain-content rounded-3xl h-fit py-7 pl-8 pr-2 shadow-lg relative'>
                        <button onClick={()=>handleOnClick(val.id)} onMouseEnter={()=>handleOpenPopup(val)} onMouseLeave={()=>handleClosePopup(val.id)} className='rounded-full size-7 bg-pastelGreen right-3 top-2 absolute'>
                            <TrashIcon className='size-4 m-auto'/>
                        </button>
                        {
                             messagePopup[val.id] && <Popup content={'delete'}/>
                        }
                        {val.content}
                    </div>
                    {
                        deleteMessagePopup && <DeleteMessagePopup  closePopup={()=>setDeleteMessagePopup(false)} messageId={val.id}/>
                    }
                </li>
            )
        }
    </ul>
  )
}

export default SavedMessagesLayout