import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/SignIn";
import NotFound from "./Components/NotFound/NotFound";
import StudentDashboard from "./Components/Students/Dashboard/Dashboard";
import StudentMarks from "./Components/Students/Marks/Marks";
import StudentChat from "./Components/Students/Chat/Chat";
import ProctorDashboard from "./Components/Proctor/Dashboard/Dashboard";
import ProctorStudents from "./Components/Proctor/Student/Students";
import ProctorChat from "./Components/Proctor/Chat/Chat.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/*Login*/}
          <Route exact path="/" element={<Login />} />
          {/*Student*/}
          <Route path="/student/" element={<StudentDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/marks" element={<StudentMarks />} />
          <Route path="/student/chat" element={<StudentChat />} />
          {/*NotFound*/}
          <Route path="/proctor/" element={<ProctorDashboard />} />
          <Route path="/proctor/students" element={<ProctorStudents />} />
          <Route path="/proctor/chat" element={<ProctorChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
