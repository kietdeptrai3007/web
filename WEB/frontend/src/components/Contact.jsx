import React, { useState } from 'react';
import './Home.css'; // dùng chung style nếu bạn đã viết ở đây

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Cảm ơn bạn đã gửi phản hồi!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Gửi thất bại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi server.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📮 Gửi ý kiến liên hệ</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            name="name"
            placeholder="Tên của bạn"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung liên hệ"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
