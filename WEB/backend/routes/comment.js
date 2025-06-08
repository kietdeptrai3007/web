// backend/routes/comment.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Lấy danh sách bình luận theo content_id
router.get('/:content_id', (req, res) => {
  const contentId = req.params.content_id;
  const sql = 'SELECT * FROM comments WHERE content_id = ?';
  db.query(sql, [contentId], (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json(results);
  });
});

// POST - Gửi bình luận mới
router.post('/', (req, res) => {
  const { user_id, content_id, comment, rating } = req.body;
  console.log('POST body:', req.body);


  // Kiểm tra dữ liệu đầu vào
  if (!user_id || !content_id || !comment || !rating) {
    console.log("⚠️ Dữ liệu thiếu:", req.body);
    return res.status(400).json({ error: 'Thiếu dữ liệu!' });
  }

  const sql = 'INSERT INTO comments (user_id, content_id, comment, rating) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, content_id, comment, rating], (err, result) => {
    if (err) {
      console.error('❌ Lỗi thêm bình luận:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
