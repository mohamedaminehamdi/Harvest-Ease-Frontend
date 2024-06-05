import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import '../components/Layout.css'

function Layout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full">
  {children}
</main>
    </div>
  );
}

export default Layout;
