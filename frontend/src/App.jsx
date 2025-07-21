import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import {Routes,Route, Navigate} from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SettingPage from "./components/SettingPage";
import Profile from "./components/Profile";
import { useAuth } from "../context/useAuth";
import { Loader } from 'lucide-react';
import Signup from "./components/Signup";


const App = () => {
  const {authuser,checkAuth,isCheckingAuth} = useAuth();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]); 
  console.log({authuser});

  if (isCheckingAuth && !authuser) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin w-12 h-12 text-blue-500" />
    </div>
    );
  }


  return <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={authuser?<HomePage/>:<Navigate to="/login"/>} />
      <Route path="/signup" element={!authuser?<Signup/>:<Navigate to="/"/>} />
      <Route path="/login" element={!authuser?<Login/>:<Navigate to="/"/>} />
      <Route path="/settings" element={<SettingPage/>} />
      <Route path="/profile" element={authuser?<Profile/>:<Navigate to="/login"/>} />
    </Routes>
  </div>;
};

export default App;
