import { configureStore} from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice"
import videosReducer from '../redux/slice/videosSlice'
import videoReducer from '../redux/slice/videoSlice'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        videos: videosReducer,
        video: videoReducer
    }
});