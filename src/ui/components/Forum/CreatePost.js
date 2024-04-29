import React, { useState } from "react";
import Sk from "../../../assets/skan.jpg";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostModal from "./PostModal";

function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 mt-4 mb-2 border border-gray-300">
      <div className="flex items-center mb-2 justify-around">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={Sk}
          alt="User Avatar"
        />
        <div
          className="cursor-pointer text-lg text-gray-400 ml-2"
          onClick={() => setShowModal(true)}
        >
          connect with other farmers
        </div>
        <FontAwesomeIcon icon={faIcons} className="size-6 ml-1" />
      </div>
      {showModal && <PostModal setShowModal={setShowModal} />}
    </div>
  );
}

export default CreatePost;
