import React, { useContext} from 'react'
import { ChatContext } from '../../../providers/ChatProvider';

function DeleteMessagePopup({ closePopup, messageId }) {
    const { deleteMessage } = useContext(ChatContext);
    const handleOnYesClick = () => {
        deleteMessage(messageId)
        console.log(messageId)
        closePopup()
    }

  return (
    <div className='bg-pastelYellow h-1/3 w-1/4  rounded-2xl fixed top-1/4 left-1/2 bottom-1/4 text-center p-7 flex flex-col'>
        Are you sure You want to delete this?
        <div className='flex flex-row mt-8'>
            <button onClick={closePopup} className='flex-1 w-1/3 h-9 border-2 border-grassGreen text-grassGreen rounded-3xl hover:bg-grassGreen hover:text-pastelYellow'>
                No
            </button>
            <button onClick={handleOnYesClick} className='ml-2 flex-1 w-1/3 h-9 border-2 border-grassGreen text-grassGreen rounded-3xl hover:bg-grassGreen hover:text-pastelYellow'>
                Yes
            </button>
        </div>
    </div>
  )
}

export default DeleteMessagePopup