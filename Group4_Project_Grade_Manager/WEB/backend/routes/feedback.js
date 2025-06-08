const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Thiếu thông tin' });

  const sql = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('🔥 Lỗi ghi phản hồi:', err.message);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json({ success: true, message: 'Đã gửi phản hồi' });
  });
});

module.exports = router;
