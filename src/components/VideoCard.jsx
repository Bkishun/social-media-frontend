import React from 'react';
import "../App.css";
import { NavLink } from 'react-router-dom';

const generateColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

const VideoCard = ({video, onClick}) => {
  const {thumbnail, title, views, ownerDetails, createdAt} = video
  const thumbn = thumbnail.url
  const channel = ownerDetails.username
  const timestamp = new Date(createdAt).toLocaleDateString();
  const initial = channel.charAt(0).toUpperCase();
  const circleColor = generateColorFromString(channel);
  return (
    <div className="bg-white rounded-md shadow-lg p-2 sm:w-full md:w-[45%] lg:w-[30%] xl:w-[24%]" onClick={onClick}>
        <img className='w-full h-[10rem] rounded-xl' src={thumbn} alt="thumbnail" />
        <div className='flex items-start bg-slate-200 rounded-lg p-2 mt-2'>
          <div className='w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold' style={{ backgroundColor: circleColor }} >
            {initial}
          </div>
          <div className='flex flex-col ml-3 w-[85%]'>
            <span className='text-sm font-semibold clamp-2'>{title}</span>
            <span className='text-gray-700 text-xs'>{channel}</span>
            <span className='text-gray-600 text-xs'>{views} views • {timestamp}</span>
          </div>
        </div>
    </div>
  );
};

export default VideoCard;
