import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React from 'react'

function ChatbotInput({value, onChange, onSubmit, error}) {
  return (
    <div className='w-full  h-1/6 p-3 relative'>
        <form 
            onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}
        >
          <input 
              type="text"
              value={value}
              onChange={onChange}
              className='bg-grayishGreen w-full h-10 rounded-full  p-5 outline-none text-black ' 
              placeholder='Enter a prompt here'
          />
          <button type="submit" className='mb-auto top-5 right-6 absolute'>
              <PaperAirplaneIcon className='size-6 '/>
          </button>

        </form>
    </div>
  )
}

export default ChatbotInput