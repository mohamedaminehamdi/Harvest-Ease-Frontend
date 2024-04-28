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

      <div className="flex flex-col justify-center w-full max-w-[800px] mx-auto overflow-y-auto">
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
                
                  {post.likes} Likes
                </button>
                {/* Comment button */}
                <button className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M20 7.996c0-4.414-3.582-7.996-8-7.996-4.414 0-8 3.582-8 8s3.582 8 8 8c1.746 0 3.36-.566 4.676-1.516l5.27 1.416c.398.104.78-.227.78-.648l-.005-9.25c0-.411-.324-.736-.728-.736-.182 0-.357.068-.49.19l-1.873 1.549c-.616-.447-1.35-.71-2.124-.71-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4v-.354l3.354-.896c.648-.174 1.346.152 1.585.75l.755 1.88c.131.33.492.54.86.54.405 0 .75-.285.829-.68l1.706-11.48c.026-.165-.078-.322-.24-.366-.165-.044-.322.078-.366.24l-1.682 11.337c-.046.308-.32.52-.62.52-.037 0-.072-.004-.108-.014l-3.852-1.034V7.996h-.004z"/></svg>
                  {post.comments} Comments
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
