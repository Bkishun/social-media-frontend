import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch a single video by ID
export const fetchVideoById = createAsyncThunk('video/fetchVideoById', async (videoId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/v1/videos/v/${videoId}`);
    console.log(response.data.data)
    return response.data.data;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videoDetails: null,
    videoLoading: false,
    videoError: null,
  },
  reducers: {
    clearVideoDetails: (state) => {
      state.videoDetails = null;
      state.videoError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoById.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.videoDetails = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload;
      });
  },
});

export const { clearVideoDetails } = videoSlice.actions;
export default videoSlice.reducer;
