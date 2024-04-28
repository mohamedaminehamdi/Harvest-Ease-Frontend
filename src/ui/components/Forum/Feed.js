import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons"; // Importing required FontAwesome icons
import Ahmed from "../../assets/ahmed.jpg";
import Bouden from "../../assets/bouden.jpg";
import Su from "../../assets/su.jpg";
import Comments from "./comments"; // Importing the Comments component

const Feed = () => {
  const dummyPosts = [
    {
      user: "Ahmed",
      image: Ahmed,
      content: "Hello everyone. I need help with my plants",
      created: "2h ago",
      likes: 10,
      comments: [
        { user: "John", text: "I can help you with that." },
        { user: "Emma", text: "Have you tried changing the soil?" },
      ],
    },
    {
      user: "boudrenski",
      image: Bouden,
      content:
        "Hello, everyone. is there anyone who has knowledge on edible flowers?",
      created: "2d ago",
      likes: 2,
      comments: [
        { user: "Alice", text: "Yes, I know a lot about edible flowers." },
        { user: "Bob", text: "You can try researching on XYZ website." },
      ],
    },
    {
      user: "sumaya",
      image: Su,
      content: "My plants aren't growing. Can anyone help me?",
      created: "43m ago",
      likes: 15,
      comments: [
        { user: "Eva", text: "What type of plants are you growing?" },
        { user: "Adam", text: "Have you tried giving them more sunlight?" },
      ],
    },
  ];

  const [selected, setSelected] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [commenterImages] = useState([Ahmed, Bouden, Su]); // Assuming commenter images are the same as post images

  // Function to toggle comments visibility
  const toggleComments = (comments) => {
    setSelectedComments(comments);
    setCommentsVisible(!commentsVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-between w-full h-[150px]">
        <div className="flex items-center justify-evenly border-b border-gray-200 w-full max-w-[800px] mx-auto">
          <button
            className={`hover:bg-gray-200 font-bold text-lg cursor-pointer h-[30px] w-1/2 ${
              selected === "for you" ? "bg-gray-200" : "text-gray-400"
            }`}
            onClick={() => setSelected("for you")}
          >
            For you
          </button>
          <button
            className={`hover:bg-gray-200 h-[30px] font-bold text-lg cursor-pointer w-1/2 ${
              selected === "following" ? "bg-gray-200" : "text-gray-400"
            }`}
            onClick={() => setSelected("following")}
          >
            Following
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full max-w-[800px] mx-auto">
        <div
          className="overflow-y-scroll max-h-[400px]"
          style={{
            overflowY: "scroll",
            maxHeight: "400px",
            scrollbarWidth: "thin",
            scrollbarColor: "pastelYellow pastelYellow",
          }}
        >
          {dummyPosts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={post.image}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-gray-700 font-semibold">{post.user}</span>
              </div>
              <p className="text-gray-800">{post.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">{post.created}</span>
                <div className="flex items-center">
                  {/* Like button */}
                  <button className="mr-4 flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                    {post.likes} Likes
                  </button>
                  {/* Comment button */}
                  <button
                    className="flex items-center text-gray-600"
                    onClick={() => toggleComments(post.comments)}
                  >
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    {post.comments.length} Comments
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render Comments component when visible */}
      {commentsVisible && (
        <Comments
          comments={selectedComments}
          commenterImages={commenterImages}
          onClose={() => setCommentsVisible(false)}
          setComments={setSelectedComments}
        />
      )}
    </div>
  );
};

export default Feed;
