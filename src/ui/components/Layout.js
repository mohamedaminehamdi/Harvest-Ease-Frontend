import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full h-screen ">
  {children}
</main>
    </div>
  );
}

export default Layout;
