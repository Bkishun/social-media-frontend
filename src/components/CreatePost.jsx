import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publishVideo, clearUploadState } from '../redux/slice/videosSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uploadLoading, uploadError, uploadSuccess } = useSelector((state) => state.videos);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
  });

  useEffect(() => {
    if (uploadSuccess) {
      setFormData({ title: '', description: '', videoFile: null, thumbnail: null });
      dispatch(clearUploadState());
      navigate("/")
    }
  }, [uploadSuccess, dispatch, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('videoFile', formData.videoFile);
    submitData.append('thumbnail', formData.thumbnail);
    dispatch(publishVideo(submitData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Video File</label>
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={uploadLoading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {uploadLoading ? 'Uploading...' : 'Create Post'}
          </button>
        </form>
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
        {uploadSuccess && <p className="text-green-500 mt-2">Video uploaded successfully!</p>}
      </div>
    </div>
  );
};

export default CreatePost;
