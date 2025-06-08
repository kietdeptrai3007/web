// backend/routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  console.log("🔥 Body nhận được:", req.body); // log kiểm tra

  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('❌ Lỗi đăng nhập:', err); // log cụ thể
      return res.status(500).json({ error: 'Lỗi server' });
    }

    console.log("🔎 Kết quả truy vấn:", results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Sai thông tin đăng nhập' });
    }

    res.json({ success: true, user: results[0] });
  });
});
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  const sql = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      console.error('Lỗi tạo tài khoản:', err.message);
      return res.status(500).json({ error: 'Lỗi server khi đăng ký' });
    }
    res.status(201).json({ message: 'Đăng ký thành công' });
  });
});



module.exports = router;
