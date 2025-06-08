// 📁 backend/routes/subject.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM subjects', (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi lấy danh sách môn học' });
    res.json(results);
  });
});

module.exports = router;
