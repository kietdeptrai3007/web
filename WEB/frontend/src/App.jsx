import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Contact from './components/Contact';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/login" element={<LoginForm onLogin={setUser} />} />

        {/* Trang đăng ký */}
        <Route path="/register" element={<Register />} />

        {/* Trang chủ chỉ cho phép nếu đã đăng nhập */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

        {/* Trang liên hệ (luôn cho phép) */}
        <Route path="/contact" element={<Contact />} />

        {/* Tự động điều hướng nếu vào đường dẫn sai */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
