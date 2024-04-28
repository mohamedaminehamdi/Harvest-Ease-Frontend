import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React from 'react'

function ChatbotInput() {
  return (
    <div className='w-full  h-1/6 p-3 relative'>
        <input className='bg-grayishGreen w-full h-10 rounded-full  p-5 outline-none text-black ' placeholder='Enter a prompt here'/>
        <button className='mb-auto top-5 right-6 absolute'>
            <PaperAirplaneIcon className='size-6 '/>
        </button>
    </div>
  )
}

export default ChatbotInput