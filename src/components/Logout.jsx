import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slice/authSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  return (
    <div className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
