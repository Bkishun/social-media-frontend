import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllVideos = createAsyncThunk('videos/getAllVideos', async({query, page=1, limit=10, sortBy = 'createdAt', sortType = 'desc'}, {rejectWithValue}) => {
    try {
        const params = new URLSearchParams({
            query,
            page: page.toString(),
            limit: limit.toString(),
            sortBy,
            sortType,
        });

        const response = await axios.get(`/api/v1/videos?${params.toString()}`)
        if(response.status === 200){
            return response.data.data
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const publishVideo = createAsyncThunk('videos/publishVideo', async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(response.status === 200){
        return response.data.data
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  

const videosSlice = createSlice({
    name: "videos",
    initialState : {
        loading: false,
        error: null,
        videos: [],
        fetchSuccess: false,
        uploadLoading: false,
        uploadError: null,
        uploadSuccess: false
    },

    reducers: {
        clearUploadState: (state) => {
          state.uploadLoading = false;
          state.uploadError = null;
          state.uploadSuccess = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false
            state.videos = action.payload
            state.error = null
            state.fetchSuccess = true
        })

        builder.addCase(getAllVideos.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(publishVideo.pending, (state, action) => {
            state.uploadLoading = true;
            state.uploadError = null;
            state.uploadSuccess = false;
        })

        builder.addCase(publishVideo.fulfilled, (state, action) => {
            state.uploadLoading = false;
            state.uploadSuccess = true;
        })

        builder.addCase(publishVideo.rejected, (state, action) => {
            state.uploadLoading = false;
            state.uploadError = action.payload;
        });
    }
})

export const {clearUploadState} = videosSlice.actions
export default videosSlice.reducer