import React from 'react'
import { Link } from 'react-router-dom'

function ChatbotPageNavBar({activeTab, setActiveTab}) {
  return (
    //  <div /*className='flex flex-row w-1/3 h-1/6 mx-auto mt-1 mb-4 '*/>
    //     {console.log("im heree")}
    //     <Link to="Chat">
    //         <button className={`${activeTab==='Chat'? 'bg-grassGreen text-pastelYellow ' : 'text-grassGreen hover:bg-gray-100'} font-semibold rounded-3xl w-1/4 flex-1 `} onClick={()=>setActiveTab('Chat')}>Chat</button>
    //     </Link>
    //     <Link to="Saved-messages">
    //         <button className={`${activeTab==='Saved Messages'? 'bg-grassGreen text-pastelYellow' : 'text-grassGreen hover:bg-gray-100'}  text-white font-semibold rounded-3xl w1/4 flex-1 px-3`} onClick={()=>setActiveTab('Saved Messages')}>Saved Messages</button>
    //     </Link>
    // </div>
    <div className='flex justify-center items-center w-full shadow-md py-4 '>
        <Link to="Chat">
            <button className={`${activeTab==='Chat'? 'bg-grassGreen text-pastelYellow ' : 'text-grassGreen hover:bg-gray-100'} font-semibold rounded-3xl h-8 w-40 px-3 flex-1 `} onClick={()=>setActiveTab('Chat')}>Chat</button>
        </Link>
        <Link to="Saved-messages">
            <button className={`${activeTab==='Saved Messages'? 'bg-grassGreen text-pastelYellow' : 'text-grassGreen hover:bg-gray-100'} font-bold rounded-3xl flex-1 w-40 px-3 h-8`} onClick={()=>setActiveTab('Saved Messages')}>Saved Messages</button>
        </Link>
    </div>
  )
}

export default ChatbotPageNavBar