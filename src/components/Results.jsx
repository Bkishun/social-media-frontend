import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCard from './VideoCard';


function Results() {
    const navigate = useNavigate();  
    const videos = useSelector(state => state.videos.videos)
    useEffect( () => {

    }, [videos])
  
    const handleVideoClick = (videoId) => {
      navigate(`/player/${videoId}`);
    }
    return (
        <>
        <div className='bg-gray-400 w-full min-h-[500px]'>
  
          <div className='flex p-4 justify-start gap-[15px] w-full flex-wrap'>
          {videos.docs && videos.docs.length > 0 ? (
            videos.docs.map((video) => (
              <VideoCard
                key={video._id}
                video = {video}
                onClick = {() => handleVideoClick(video._id)}
                
              />
            ))
          ) : (
            <p>No videos available</p>
          )}
          </div>
        </div>
      </>
    )
}

export default Results
