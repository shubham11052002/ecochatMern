import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import {Routes,Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SettingPage from "./pages/SettingPage";
import Profile from "./pages/Profile";
import { useAuth } from "./context/useAuth";
import { Loader } from 'lucide-react';
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuth();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]); 
  console.log({authUser});

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin w-12 h-12 text-blue-500" />
    </div>
    );
  }


  return <div>
    <Navbar/>
   <div className="p-16">
   <Routes>
      <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>} />
      <Route path="/signup" element={!authUser?<Signup/>:<Navigate to="/"/>} />
      <Route path="/login" element={!authUser?<Login/>:<Navigate to="/"/>} />
      <Route path="/settings" element={<SettingPage/>} />
      <Route path="/profile" element={authUser?<Profile/>:<Navigate to="/login"/>} />
    </Routes>
   </div>

    <Toaster/>
  </div>;
};

export default App;
