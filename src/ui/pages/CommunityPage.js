import React from "react";
import Feed from "../components/Forum/Feed";  
import Tip from "../components/Forum/Tip";    
import TrendingPosts from "../components/Forum/TrendingPosts";
import CreatePost from "../components/Forum/CreatePost";

function CommunityPage() {
  return (
    <div>
      <div className="max-w-sm mx-auto">      
        <CreatePost />
      </div>
      <div className="flex">
        <Feed />
        <div className="flex flex-col gap-5 mr-5">
          <Tip />
          <TrendingPosts />
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
