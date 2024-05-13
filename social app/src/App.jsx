
// import Home from './pages/home/home'
// import './App.css'
// import Profile from './pages/profile/profile'
// import Register from './pages/register/Register'
// import Login from './pages/login/Login'
// function App() {


//   return (
//     <>
//     {/* <Home /> */}

// {/* <Profile/> */}
// <Register/>
//     </>
//   )
// }

// export default App
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Topbar from "./components/topbar/Topbar.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Rightbar from "./components/rightbar/Rightbar.jsx";
import Feed from "./components/feed/feed.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { AuthContext } from "./Context/AuthContext.jsx";
import Messenger from "./pages/messenger/Messenger.jsx";

function App() {
  const { user } = useContext(AuthContext);
// console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/register" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
          <Route
          path="/messenger"
          element={!user ? <Navigate to="/" replace /> : < Messenger/>}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
