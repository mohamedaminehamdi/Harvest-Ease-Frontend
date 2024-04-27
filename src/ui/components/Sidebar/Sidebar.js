import React from "react";
import { NavLink } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Logo from "../../assets/Logo.png"
function Sidebar() {
  let [isSidebarOpen, setIsSidebarOpen] = useState(true);

  let onClickHandler = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`  flex-col h-screen ${
        isSidebarOpen ? "bg-darkGrey w-1/4 px-7" : "w-10 px-1 bg-darkBlue"
      }  relative`}
    >
      <button
        className={`rounded-full size-7 items-center absolute top-2  ${
          isSidebarOpen
            ? "right-3 hover:bg-gray-300 bg-darkGrey text-darkBlue"
            : "right-2 hover:bg-blue-950 bg-darkBlue text-darkGrey"
        }`}
        onClick={onClickHandler}
      >
        {isSidebarOpen ? (
          <ChevronDoubleLeftIcon className="size-6" />
        ) : (
          <ChevronDoubleRightIcon className="size-6" />
        )}
      </button>
      {isSidebarOpen && (
        <img src={Logo} alt="logo" className="flex p-5"/>
      )}
      <ul
        className={`place-content-center flex-col  font-bold text-xs text-darkBlue justify-end ${
          isSidebarOpen ? "mt-6" : "bottom-2 absolute"
        }`}
      >
        {SideBarData.map((val, key) => {
          return (
            <li key={key}>
              <NavLink
                to={val.link}
                className={({ isActive }) => {

                  if(isActive && isSidebarOpen) {
                    return "bg-pastelGreen rounded-full h-9 p-1.5"
                  }
                  else if (!isActive && isSidebarOpen) {
                    return "hover:bg-gray-500 hover:text-pastelGreen rounded-full h-9 p-1.5"
                  }

                  else if(isActive && !isSidebarOpen){
                      return 
                  }
                  
                 
                 
                } 
                }
              >
                {isSidebarOpen ? (
                  <span className="inline-block h-4 justify-center pt-1 pb-5 px-3 mt-3">
                    {val.title}
                  </span>
                ) : (
                  <button className=" bg-darkBlue hover:bg-blue-950 rounded-full size-8 items-center justify-center flex my-3 text-darkGrey">
                    {
                       val.icon
                    }
                  </button>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;