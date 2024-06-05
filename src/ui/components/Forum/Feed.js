import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import Comments from "./comments";
import FollowingList from "./FollowingList";

const Feed = () => {
  const [selected, setSelected] = useState("for you");
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [commenterImages] = useState([]);
  const [followingVisible, setFollowingVisible] = useState(false);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Forum/tweets");
        const postsData = response.data;

        // Fetch user names for each post
        const postsWithNames = await Promise.all(postsData.map(async post => {
          const userDetailsResponse = await axios.get(`http://localhost:3000/users/${post.owner}`);
          const userName = userDetailsResponse.data.name;

          return {
            content: post.content,
            created: post.created,
            user: userName,
            likes: post.likes || 0,
            comments: post.comments || []
          };
        }));

        setPosts(postsWithNames);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

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
            onClick={() => {
              setSelected("following");
              setFollowingVisible(true);
            }}
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
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 font-semibold">{post.user}</span>
              </div>
              <p className="text-gray-800">{post.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">{post.created}</span>
                <div className="flex items-center">
                  <button className="mr-4 flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                    {post.likes} Likes
                  </button>
                  <button
                    className="flex items-center text-gray-600"
                    onClick={() => toggleComments(post.comments.content)}
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

      {commentsVisible && (
        <Comments
          comments={selectedComments}
          commenterImages={commenterImages}
          onClose={() => setCommentsVisible(false)}
          setComments={setSelectedComments}
        />
      )}

      {followingVisible && (
        <FollowingList onClose={() => setFollowingVisible(false)} />
      )}
    </div>
  );
};

export default Feed;
