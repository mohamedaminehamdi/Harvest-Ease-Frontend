import React from "react";

const TrendingPosts = () => {
  const dummyTrendingPosts = [
    {
      user: "user4568",
      content: "Choose disease-resistant varieties and practice",
      created: "2h ago",
    },
    {
      user: "user33",
      content: "Choose disease-resistant varieties and practice",
      created: "3h ago",
    },
    {
      user: "user7",
      content: "Choose disease-resistant varieties and practice",
      created: "43m ago",
    },
  ];
  return (
    <div className="flex flex-col justify-center align-center bg-[#154734] max-w-xs rounded-xl shadow-md p-4">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-bold text-[#f7fecb]">Trending Posts</h2>
      </div>
      {dummyTrendingPosts.map((post, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-2"
                src="https://via.placeholder.com/50"
                alt="User Avatar"
              />
              <p className="text-lg font-bold text-white">{post.user}</p>
            </div>
            <p className="text-sm text-white">{post.created}</p>
          </div>
          <p className="text-xs text-white">{post.content}</p>
        </div>
      ))}
      <button className="p-2 text-white rounded-full font-bold text-sm bg-[#6A8B6C] hover:bg-[#8BB09C] focus:outline-none">
        More
      </button>
    </div>
  );
};

export default TrendingPosts;
