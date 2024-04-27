import React, { useState } from "react";
import Ahmed from "../../assets/ahmed.jpg";
import Bouden from "../../assets/bouden.jpg";
import Su from "../../assets/su.jpg";

const Feed = () => {
  const dummyPosts = [
    {
      user: "Ahmed",
      image: Ahmed,
      content: "Hello everyone. I need help with my plants",
      created: "2h ago",
      likes: 10,
      comments: 100
    },
    {
      user: "boudrenski",
      image: Bouden,
      content: "Hello, everyone. is there anyone who has knowledge on edible flowers?",
      created: "2d ago",
      likes: 2,
      comments: 289
    },
    {
      user: "sumaya",
      image: Su,
      content: "My plants aren't growing. Can anyone help me?",
      created: "43m ago",
      likes: 15,
      comments: 300
    },
  ];

  const [selected, setSelected] = useState('');

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-between w-full h-[150px] mb-8">
        <div className="flex items-center justify-evenly border-b border-gray-200 w-full max-w-[800px] mx-auto">
          <div className={`cursor-pointer ${selected === 'for you' ? 'bg-gray-200' : ''}`} onClick={() => setSelected("for you")}>
            <div className="hover:bg-gray-200">
              <h1 className={`font-bold text-lg ${selected === 'for you' ? 'text-gray-700' : 'text-gray-600'}`}>For you</h1>
            </div>
          </div>
          <div className={`cursor-pointer ${selected === 'following' ? 'bg-gray-200' : ''}`} onClick={() => setSelected('following')}>
            <div className="hover:bg-gray-200">
              <h1 className={`font-bold text-lg ${selected === 'following' ? 'text-gray-700' : 'text-gray-600'}`}>Following</h1>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col justify-center w-full max-w-[800px] mx-auto">
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
                <span className="mr-4 text-gray-600">{post.likes} Likes</span>
                <span className="text-gray-600">{post.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
