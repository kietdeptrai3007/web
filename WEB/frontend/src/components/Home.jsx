import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StudentList from './StudentList';
import PopupAd from './PopupAd';
import './Home.css'; // ✅ Import CSS responsive

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Bạn đã đăng xuất!');
    navigate('/login');
  };

  return (
  <div className="home-container">
    <PopupAd />
    <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
    <img src="/stanford.jpg" alt="stanford" className="home-banner" />

     <div className="welcome-box">
      <h2 className="home-title">🎓 Chào mừng đến với hệ thống quản lý điểm</h2>
      <h1> Xin chào, <span className="highlight">{user?.username}</span>!</h1>
      <p>🔐 <i>Vai trò:</i> <span className="role">{user?.role}</span></p>
      <p>
        💌 <Link to="/contact" className="contact-link">Liên hệ với chúng tôi</Link>
      </p>
    </div>

    <hr />
    <StudentList />
  </div>
);

}

export default Home;
