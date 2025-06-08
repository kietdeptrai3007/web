const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: Gửi một thông báo mới
router.post('/', (req, res) => {
  const { sender_id, recipient_id, message } = req.body;
  if (!sender_id || !recipient_id || !message) {
    return res.status(400).json({ error: 'Thiếu thông tin cần thiết' });
  }
  const sql = 'INSERT INTO notifications (sender_id, recipient_id, message) VALUES (?, ?, ?)';
  db.query(sql, [sender_id, recipient_id, message], (err, result) => {
    if (err) {
      console.error('Lỗi khi gửi thông báo:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.status(201).json({ message: 'Gửi thông báo thành công', notificationId: result.insertId });
  });
});

// GET: Lấy tất cả thông báo cho một người dùng
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM notifications WHERE recipient_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Lỗi khi lấy thông báo:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json(results);
  });
});

module.exports = router;