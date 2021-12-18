import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/SignIn";
import NotFound from "./Components/NotFound/NotFound";
import Dashboard from "./Components/Students/Dashboard/Dashboard";

function App() {
  console.log(global.googleId);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/student"
            element={<Dashboard gid={global.googleId} />}
          />
          <Route
            path="/student/dashboard"
            element={<Dashboard gid={global.googleId} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
