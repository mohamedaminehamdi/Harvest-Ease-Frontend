import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout({children}) {
  return (
    <div className="flex min-h-screen ">
        <Sidebar/>
        <main className='flex-1 flex-col w-full h-screen'>{children}</main>
    </div>
  )
}

export default Layout