import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import "./App.css"
import Home from "./components/Home.jsx"
import Login from "./components/Login"
import Signup from './components/Signup.jsx';
import AboutUs from './components/AboutUs.jsx';
import YourLibrary from './components/YourLibrary.jsx';
import Player from "./components/Player.jsx"
import CreatePost from './components/CreatePost.jsx';
import Results from './components/Results.jsx';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/history' element={<Signup />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/you' element={<YourLibrary/>} />
        <Route path="/player/:videoId" element={<Player />} />
        <Route path='/createPost' element={<CreatePost/>} />
        <Route path='/results' element={<Results/>} />
        
      </Routes>
      
    </>
  )
}

export default App
