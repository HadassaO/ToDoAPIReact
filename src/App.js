import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './Tasks';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;