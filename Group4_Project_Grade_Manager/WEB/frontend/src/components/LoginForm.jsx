// 📁 frontend/src/components/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('user', JSON.stringify(data.user));
        if (onLogin) onLogin(data.user);
        window.location.href = '/home';
      } else {
        alert(data.error || 'Sai tài khoản hoặc mật khẩu.');
      }
    } catch (err) {
      alert('Lỗi server');
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src="/download.jpg" alt="classroom" className="login-image" />
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Chào mừng đến với trang quản lý điểm</h1>
          <img src="/hust.png" alt="logo" className="login-logo" />
          <h2>Đăng nhập</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên đăng nhập"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
          />
          <button type="submit">🔐 Đăng nhập</button>
          <p style={{ fontSize: '14px' }}>
  Chưa có tài khoản? <a href="/register">Đăng ký</a>
</p>

        </form>
      </div>
    </div>
  );
}

export default LoginForm;
