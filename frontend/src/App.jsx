import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import {Routes,Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Singup from "./components/Singup";
import SettingPage from "./components/SettingPage";
import Profile from "./components/Profile";
import { useAuth } from "../context/useAuth";


const App = () => {
  const {authuser,checkAuth} = useAuth();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]); 
  console.log({authuser});


  return <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/singup" element={<Singup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/settings" element={<SettingPage/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  </div>;
};

export default App;
