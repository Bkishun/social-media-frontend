import React, { useState } from 'react';

const LikeBar = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  return (
    <div className="w-full flex justify-around items-center bg-white rounded-full shadow-lg">
      <div className="flex flex-col items-center">
        <button
          className="bg-transparent hover:text-blue-500 focus:outline-none"
          onClick={handleLike}
        >
          👍
        </button>
        <span className="text-gray-700">{likes}</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-transparent hover:text-red-500 focus:outline-none"
          onClick={handleDislike}
        >
          👎
        </button>
        <span className="text-gray-700">{dislikes}</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-transparent hover:text-green-500 focus:outline-none"
          onClick={handleComment}
        >
          💬
        </button>
        <span className="text-gray-700">{comments}</span>
      </div>
    </div>
  );
};

export default LikeBar;
