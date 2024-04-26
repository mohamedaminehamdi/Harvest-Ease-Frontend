import React from "react";

const Feed = () => {
  const dummyPosts = [
    {
      user: "user12354",
      content: "Hello everyone. I need help with my plants",
      created: "2h ago",
      likes: 10,
      comments: 100
    },
    {
      user: "user21456",
      content: "Hello, everyone. is there anyone who has knowledge on edible flowers?",
      created: "2d ago",
      likes: 2,
      comments: 289
    },
    {
      user: "user12354",
      content: "My plants aren't growing. Can anyone help me?",
      created: "43m ago",
      likes: 15,
      comments: 300
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-between w-full h-[150px] mb-8">
        <div className="flex items-center justify-evenly border-b border-gray-200 w-full max-w-[800px] mx-auto">
          <div className="cursor-pointer hover:bg-gray-200 w-1/2 text-center px-4 py-3">
            <h1 className="font-bold text-gray-700 text-lg">For you</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-1/2 text-center px-4 py-3">
            <h1 className="font-bold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full max-w-[800px] mx-auto">
        {dummyPosts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-2">
              <img
                src={`https://via.placeholder.com/50?text=${post.user}`}
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
