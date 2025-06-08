// 📁 frontend/src/components/Register.jsx
import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Đăng ký thành công!');
        window.location.href = '/login';
      } else {
        alert(data.error || 'Đăng ký thất bại.');
      }
    } catch (err) {
      alert('❌ Lỗi kết nối server.');
      console.error(err);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>📝 Đăng ký tài khoản</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị viên</option>
          </select>
          <button type="submit">🚀 Đăng ký</button>
        </form>
        <p className="login-link">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
      </div>
    </div>
  );
}

export default Register;
