import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import '../components/Layout.css'

function Layout({ children }) {
  // The overview at "/" brings its own sidebar and top bar.
  if (useLocation().pathname === "/") return children;

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
