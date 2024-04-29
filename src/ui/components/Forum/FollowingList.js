import React from "react";
import Ahmed from "../../../assets/ahmed.jpg";
import Bouden from "../../../assets/bouden.jpg";
import Su from "../../../assets/su.jpg";

const FollowingList = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-96 overflow-y-scroll max-h-full">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>Close</button>
        <h2 className="text-lg font-semibold mb-4">Following List</h2>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <img src={Ahmed} alt="Ahmed" className="w-12 h-12 rounded-full mr-2" />
            <span className="text-gray-700 font-semibold">Ahmed</span>
          </div>
          <div className="flex items-center mb-2">
            <img src={Bouden} alt="Bouden" className="w-12 h-12 rounded-full mr-2" />
            <span className="text-gray-700 font-semibold">Bouden</span>
          </div>
          <div className="flex items-center mb-2">
            <img src={Su} alt="Su" className="w-12 h-12 rounded-full mr-2" />
            <span className="text-gray-700 font-semibold">Su</span>
          </div>
          {/* Add more users here */}
        </div>
        <button onClick={onClose} className="bg-red-500 text-gray-800 px-4 py-2 rounded mt-4 w-full">Close</button>
      </div>
    </div>
  );
};

export default FollowingList;