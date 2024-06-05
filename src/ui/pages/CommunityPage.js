import React from "react";
import Feed from "../components/Forum/Feed";
import Tip from "../components/Forum/Tip";
import TrendingPosts from "../components/Forum/TrendingPosts";
import CreatePost from "../components/Forum/CreatePost";

function CommunityPage() {
  return (
    <>
      <div className="flex justify-around overflow-auto">
        <div className="flex flex-col flex-auto justify-center items-center ml-3">
          <CreatePost />
          <Feed />
        </div>
        <div className="flex flex-col align-center justify-center gap-3 mr-5 ml-3 ">
          <Tip />
          <TrendingPosts />
        </div>
      </div>
    </>
  );
}

export default CommunityPage;
