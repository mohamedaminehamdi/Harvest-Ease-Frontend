import React from "react";
import Feed from "../components/Forum/Feed";
import Tip from "../components/Forum/Tip";
import TrendingPosts from "../components/Forum/TrendingPosts";
import CreatePost from "../components/Forum/CreatePost";

function CommunityPage() {
  return (
    <>
      <div className="max-w-md mx-auto">
        <CreatePost />
      </div>
      <div className="flex">
        <Feed />
        <div className="flex flex-col gap-3 mr-5">
          <Tip />
          <TrendingPosts />
        </div>
      </div>
    </>
  );
}

export default CommunityPage;
