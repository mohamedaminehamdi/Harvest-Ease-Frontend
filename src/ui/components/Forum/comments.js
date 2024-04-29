import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

// Single Comment component
const SingleComment = ({ comment, onReply }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex items-start mb-4">
      {/* Commenter Image */}
      <img src={comment.commenterImage} alt="commenter" className="w-8 h-8 rounded-full mr-2" />

      {/* Comment Content */}
      <div className="flex-grow">
        {/* Commenter Name */}
        <div className="flex items-center mb-1">
          <span className="font-semibold mr-2">{comment.user}</span>
          <span className="text-gray-500 text-sm">{comment.created}</span>
        </div>
        {/* Comment Text */}
        <p className="text-gray-800 mb-2">{comment.text}</p>
        {/* Like Icon */}
        <div className="flex items-center">
          <button className="text-gray-500 mr-4" onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} className={`mr-1 ${liked ? 'text-blue-500' : ''}`} />
            {liked ? 'Liked' : 'Like'}
          </button>
          <button className="text-gray-500" onClick={() => onReply(comment)}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

const Comments = ({ comments, onClose, setComments }) => {
  // Reply input state
  const [reply, setReply] = useState('');
  const [replyingComment, setReplyingComment] = useState(null);

  // Function to handle adding a reply
  const handleAddReply = () => {
    // Check if the reply is not empty
    if (reply.trim() !== '') {
      // Add the reply to the replying comment
      const updatedComments = comments.map((comment) => {
        if (comment === replyingComment) {
          return {
            ...comment,
            replies: [...(comment.replies || []), { user: "You", created: new Date().toLocaleString(), text: reply }]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      // Clear reply input
      setReply('');
      // Reset replyingComment
      setReplyingComment(null);
    }
  };

  // Function to handle replying to a comment
  const handleReply = (comment) => {
    // Show reply input for the selected comment
    setReplyingComment(comment);
  };

  // Function to handle adding a new comment
  const handleAddComment = () => {
    // Check if the reply is not empty
    if (reply.trim() !== '') {
      // Add the new comment to the list of comments with the user's image
      const newComment = {
        user: "You", // Assuming the user's name is "You"
        created: new Date().toLocaleString(), // Assuming the current date/time
        text: reply,
        commenterImage: "" // Provide the URL of the user's image here
      };
      const newComments = [...comments, newComment];
      setComments(newComments);
      // Clear reply input
      setReply('');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-96 overflow-y-scroll max-h-full">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>Close</button>
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        {/* Comment Section */}
        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={index}>
              <SingleComment
                comment={comment}
                onReply={handleReply}
              />
              {/* Reply Input */}
              {replyingComment === comment && (
                <div className="ml-8 mb-4">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="w-full border rounded p-2 resize-none"
                    placeholder="Write a reply..."
                    rows={3}
                  />
                  <button onClick={handleAddReply} className="bg-green-600 text-white px-4 py-2 rounded mt-2">Reply</button>
                </div>
              )}
              {/* Display Replies */}
              {comment.replies && comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex} className="ml-8 mb-2">
                  <p className="text-gray-500"><span className="font-semibold">You:</span> {reply.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Add Comment Input */}
        <div>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full border rounded p-2 resize-none"
            placeholder="Add a comment..."
            rows={3}
          />
          <div className="flex justify-between">
            <button onClick={handleAddComment} className="bg-green-600 text-white px-4 py-2 rounded mt-2">Add Comment</button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;