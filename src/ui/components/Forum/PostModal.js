import React, { useState } from "react";
import axios from 'axios'
const PostModal = ({ setShowModal }) => {
  const [postContent, setPostContent] = useState("");
  const handlePostSubmit = async () => {
    if (!postContent) {
      // Handle empty content (optional: display error message)
      return;
    }

    const ownerId = "6659ca33a44cf2c889c7019e"; // Replace with logic to get owner ID

    try {
      const response = await axios.post("http://127.0.0.1:3000/Forum/tweets", {
        content: postContent,
        ownerId,
      });

      if (response.status === 201) { // Check for successful creation (201 Created)
        console.log("Post created successfully:", response.data);
        window.location.reload();
        setShowModal(false) // Optional: log response
      } else {
        console.error("Error creating post:", response.status); // Handle other status codes
      }
    } catch (error) {
      console.error("Error sending post request:", error); // Handle network errors
    }
  };
  return (
    <div className="fixed z-10 inset-0">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create a Post
                </h3>
                <input
                  className="w-full border rounded-md p-2 mt-5"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            
<button
  type="button"
  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
  onClick={handlePostSubmit} // Call handlePostSubmit on button click
>
  Post
</button>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
