import React from "react";

function CreatePost() {
  return (
    <div className="w-xs bg-white rounded-lg shadow-md p-4 flex justify-between mt-4 mb-8 border border-gray-300">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src="https://via.placeholder.com/50"
          alt="User Avatar"
        />
        <input
          className="w-64 outline-none border-none text-lg border-r-0 rounded-l-lg"
          type="text"
          placeholder="What's on your mind?"
        />
      </div>
      <button className="bg-[#B0CDB3] px-4 py-1 text-lg text-black text-right border-none rounded-full hover:bg-[#8BB09C] focus:outline-none">
        Post
      </button>
    </div>
  );
}

export default CreatePost;