import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import Navbar from "./Navbar";

import EventBus from "./common/EventBus";
import FileUploadComponent from "./components/FileUploadComponent";
import Offers from "./components/Offers";
import ApplicationList from "./components/ApplicationList";
import FileUpload from "./components/FileUpload";
import PdfUploadForm from "./components/PdfUploadForm";
import PdfDownload from "./components/PdfDownload";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
      <div>
        <Navbar
            currentUser={currentUser}
            logOut={logOut}
            showModeratorBoard={showModeratorBoard}
            showAdminBoard={showAdminBoard}
        />

        <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/apply" element={<BoardUser/>} />
          <Route path="/offersManagement" element={<Offers/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/applications" element={<ApplicationList/>} />
          <Route path="/fileUploadComponent" element={<FileUploadComponent/>} />
          <Route path="/fileUpload" element={<FileUpload/>} />
          <Route path="/cv" element={<PdfUploadForm/>} />
          <Route path="/cvDownload" element={<PdfDownload/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
