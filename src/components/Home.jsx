import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../redux/slice/authSlice';


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const videos = useSelector(state => state.videos.videos)
  console.log(videos.docs) // home

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  // useEffect( () => {

  // }, [videos])

  // const handleVideoClick = (videoId) => {
  //   navigate(`/player/${videoId}`);
  // }
  
  return (
    <>
      <div className='bg-gray-400 w-full min-h-[500px]'>

        {/* <div className='flex p-4 justify-start gap-[15px] w-full flex-wrap'>
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
        </div> */}
        <h1>Home page</h1>
      </div>
    </>
  );
}

export default Home
