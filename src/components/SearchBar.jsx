import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideos, clearUploadState } from '../redux/slice/videosSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { loading } = useSelector(state => state.videos);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(clearUploadState());
    if (query) {
      dispatch(getAllVideos({ query, page: 1, limit: 10, sortBy: 'createdAt', sortType: 'desc' }));
      navigate(`/results?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
        placeholder="Search..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-700 text-white rounded-r-md hover:bg-red-500"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
